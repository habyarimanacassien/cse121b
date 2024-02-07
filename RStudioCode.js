rm(list=ls()) # clear the past variables
############################################################################
############################################################################
old <- Sys.time() # get start time 
number_of_cores <- 2

Niter <- 100000  #number of iterations
Max_iter <- 1  ## UPTO 5

#Inputs
Timev <- c(100, 1000) # Final time interval
truebeta <- 0.5  # true value of the parameter to estimate 
lambda_v <- c(0.1, 0.5, 0.9) 
alpha_v <- c(0.1, 0.5, 0.9) 

#rate_v <- c(0.05, 0.1)


#set directory as folder containing current file
#install.packages("rstudioapi")
library(rstudioapi)
cur_dir = dirname(getSourceEditorContext()$path)
setwd(cur_dir)

# Useful libraries
#install.packages("rlist")
library(MittagLeffleR)
library(pracma)
library("rlist")
# load parallel package
require(parallel)
library(ggplot2)
library(LaplacesDemon)



##### 4.  FHP_BETA

proc <- "FHP"
par <- "Beta"
dataset <- "SimulatedData"


#Function to compute the likelihood function  for FRACTIONAL HAWKES PROCESS
compute_logLikelihood <- function(distr, lambda, alpha, beta, Time){
  library(MittagLeffleR)
  k = length(distr)
  ll1 = 0
  for (i in 1:k){
    si = 0
    if (i > 1){
      for(j in 1:(i-1)){
        si = si + ((distr[i]-distr[j])^(beta-1))*mlf(-(distr[i]-distr[j])^beta,beta,beta,1)
      }}
    ll1 = ll1 + log(lambda + alpha*si) - alpha*(1 - mlf(-(distr[k]-distr[i])^beta,beta,1,1))
  }
  ll <- ll1 - lambda*Time

#  likelihood <- exp(ll)
  return (ll)
  #end function
}


for(l_index in 1:length(lambda_v)){
  
  for (a_index in 1:length(alpha_v)){
    
    lambda <- lambda_v[l_index]
    alpha <- alpha_v[a_index]
    
    
    for (iter in 1:Max_iter){
      
      # Save FIGURES in a pdf or png file
      pdf(file = paste0("Fig",proc,"_",par,"_",dataset,"_a",alpha,"_l",lambda,"_i",iter,".pdf"), width=12.5, height=10.5)
      par(mar = c(4, 4, 3, 1))        # Reduce space around plots
      par(mfrow=c(4,5),oma=c(3,3,3,3))
      
      for (iT in 1:length(Timev)){
        Time <- Timev[iT]
        
        # LOAD THE DATA SAVED
        load(file=paste0("data",proc,"_",par,"_",dataset,"_a",alpha,"_l",lambda,"_T",Time,"_D1_i",iter,".rdata"))
        load(file=paste0("data",proc,"_",par,"_",dataset,"_a",alpha,"_l",lambda,"_T",Time,"_D2_i",iter,".rdata"))
        # Extract data
        out_distance1 <- df1$out_distance1
        out_distance2 <- df1$out_distance2
        out_distance3 <- df1$out_distance3
        out_distance4 <- df1$out_distance4
        out_distance5 <- df1$out_distance5
        ParameterSample_values <- df1$ParameterSample_values
        SimPoints <- df2$SimPoints
        
        
        ### DISTANCE NAMES 
        dist1 <- "LN"
        dist2 <- "WS"
        dist3 <- "MDG90"
        dist4 <- "MDL50"
        dist5 <- "DIGAD"
        
        data_frame1 <- data.frame(out_distance1, out_distance2, out_distance3, out_distance4, out_distance5)
        data_frame2 <- data.frame(dist1, dist2, dist3, dist4, dist5)
        
        ## parameter values interval: [0, 1]
        dx <- 1/60 #0.025/3*2 #bin size
        LL <- 1/60 #0.025/3*2 # lower limit of the breaks interval
        UL <- 59/60 # upper limit of the breaks interval
        breaks_interval <- seq(LL-dx,UL+dx,by=dx)
        mids_interval <- seq(LL-dx/2, UL+dx/2, by=dx)
        cl <- makeCluster(number_of_cores)  # 'number_of_cores' is the number of clusters (cores)
        logLikelihood <- parSapply(cl, mids_interval, compute_logLikelihood, distr = SimPoints, lambda = lambda, alpha = alpha, Time = Time)
        stopCluster(cl)
        
        likelihood <- exp(logLikelihood - mean(logLikelihood))  # translation of the logLikelihood to remove impossibility
        
        len1 <- length(out_distance1[which(out_distance1 <= 0)])
        len2 <- length(out_distance2[which(out_distance2 <= 0)])
        len3 <- length(out_distance3[which(out_distance3 <= 0)])
        len4 <- length(out_distance4[which(out_distance4 <= 0)])
        len5 <- length(out_distance5[which(out_distance5 <= 0)])
        
        len <- max(len1, len2, len3, len4, len5)
        min_rate <- len/Niter
        
        if (min_rate <= 0.01){
          rate1 <- 0.01
          rate2 <- 0.1
          } else { #if (0.01 < min_rate & min_rate <= 0.05 ) {
          rate1 <- min_rate
          rate2 <- 0.1
          }
        rate_v <- c(rate1, rate2)
        
        for (j in 1:length(rate_v)){
          
      
          for (i in 1:length(data_frame1)){ # 
            out_distance <- as.numeric(data_frame1[[i]])
            dist <- as.character(data_frame2[[i]])
            
            
            rate <- rate_v[j]
            d <- quantile(out_distance, probs = rate, na.rm = TRUE)
            
            # Select parameter values corresponding to distances 
            # less than threshold distance d
            abc_posterior <- ParameterSample_values[which(out_distance < d)]
            
            ## kullback–Leibler divergence
            
            ### With Classical HISTOGRAM
            h <- hist(abc_posterior,breaks = breaks_interval, plot = FALSE) # No need  
            ## of setting 'probability=TRUE' when used 'plot=FALSE'
            density_ABC <- h$density
            
            posterior <- likelihood # For uniform prior in [0,1]
            exact_posterior <- posterior
            exact_posterior <- exact_posterior/sum(exact_posterior)/(dx) #Normalization
            density_LIK <- exact_posterior
            
            ### Penalise zero (0) values of the density
            eps <- 1e-10
            for (v in 1:length(density_ABC)){
              if (density_ABC[v]==0){
                density_ABC[v]=eps
              }
              if (density_LIK[v]==0){
                density_LIK[v]=eps
              }
            }
            
            ## We can find the KLD using hist densities
            KLD_value <- KLD(density_LIK,density_ABC)  ## KLD(Likelihood, ABC)
            
            dist_used = paste0("Dist : ",dist)
            threshold_dist = bquote("Threshold "*epsilon == .(round(d,3)))
            sel_rate = paste0("Sel Rate = ",round(rate*100,1),"%")
            dkl_LIK_ABC <- paste0("KLD(LIK,ABC) = ",round(KLD_value[[4]], 3))
            dkl_ABC_LIK <- paste0("KLD(ABC,LIK) = ",round(KLD_value[[5]], 3))
            average <- paste0("Post Mean = ",round(mean(abc_posterior),3))
            stand_dev <- paste0("Post STD = ",round(std(abc_posterior),3))
            
            min_h1 <- min(abc_posterior)
            max_h1 <- max(abc_posterior)
            dx_h1 <- 0.001
            h1 <- hist(abc_posterior, breaks = seq(min_h1-dx_h1, max_h1+dx_h1, dx_h1), plot = FALSE) 
            ymax <- max(max(h1$density), max(exact_posterior))
            
            #create plot
            fig <- function(){
              h2 <- hist(abc_posterior, probability=TRUE, ylim=c(0,1.25*ymax),#ceiling(1.25*ymax)), 
                         col="darkolivegreen", border="#333333", xlab="", ylab="", main="", xlim=c(0,1))
              lines(h$mids,exact_posterior,col='red',type="l", lwd=2)
              # abline(v=truebeta, col="blue", lty=1, lwd=2)
              segments(x0=truebeta,y0=0,x1=truebeta,y1=ymax,col='blue',lwd=2)
              text(-0.015, ymax*1.25, dkl_ABC_LIK , pos = 4, col = "#330000")
              text(-0.015, ymax*1.15, average , pos = 4, col = "#330000")
              text(-0.015, ymax*1.05, stand_dev , pos = 4, col = "#330000")
              ###return(hist_gr) 
            }
            
            fig()
            mtext(paste0(dist),side=3,line=0,outer=FALSE,las=1, col="darkblue", lwd = 0.5)        
          }
          mtext(expression(beta),side=1,line=0,outer=TRUE,las=0)
          mtext("Density",side=2,line=0,outer=TRUE,las=0)
          mtext(paste0("\n T = ",Time,"\n Sel Rate = ",round(rate*100,1),"%"),side=3,line=2,outer=FALSE,las=1, col="darkred")
        }
        
      }
      dev.off()
    }
  }
}


new <- Sys.time()
time_diff <- new - old # calculate difference
print(time_diff)