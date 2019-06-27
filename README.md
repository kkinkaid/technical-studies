# technical-studies
This is a collection of technical analysis studies that I have created.  I use both the ThinkorSwim platform and TradingView for charts and have created two custom indicators for each.  To make it easier to share my code between platforms, I have saved them to GitHub.

## MACD ATR
This is simply the MACD indicator normalized by ATR.  The values of MACD provides are dependant upon the underlying secuity's price and volatility. ATR is one measure of volatility so I chose that adjust the vlaue of the different line.  Now, for example, you can say that a vlue of -2 or 2 is roughly the same importance in any security you're looking at.

## Heikin Ashi Height
This is a simple indicator based on Heikin Ashi charting.  It measures the height of the bar and the wick in the "opposite" direction of price movement.  The theory behind it is when there is a heikin ashi trend, there will be no wicks, and when there is a wick there is no trend.  I created this so that I could plot this on a regular chart rather than a Heikin Ashi chart since HA charts don't reflect real price movement.  I normalized the values by ATR to be able to compare different securities that have different prices and volatilities.

## Comp Vol
This is an indicator which ranks various volatility measures on a 1-100 scale for the past year.  It includes historical volatility, average true range, bollinger band width, and the width of a moving average ribbon.  It can be used to judge the volatility of an instrument and, if combined with implied volatility, it could be used to determine when options are over or under priced.
