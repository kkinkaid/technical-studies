#
# TD Ameritrade IP Company, Inc. (c) 2009-2020
#

declare lower;

input price = close;
input fastLength = 2;
input slowLength = 30;
input effRatioLength = 10;
input slopeLen = 3;
input atradjust = yes;
input mode = {default KAMA, AMA};


Assert(fastLength > 0, "'fast length' must be positive: " + fastLength);
Assert(slowLength > 0, "'slow length' must be positive: " + slowLength);

def direction;
def volatility;
def ER;

switch (mode) {
case KAMA:
    direction = AbsValue(price - price[effRatioLength]);
    volatility = Sum(AbsValue(price - price[1]), effRatioLength);
    ER = if volatility != 0 then direction / volatility else 0;
case AMA:
    direction = Double.NaN;
    volatility = Double.NaN;
    ER = AbsValue((price - Lowest(low, effRatioLength)) -
(Highest(high, effRatioLength) - price)) / (Highest(high,
effRatioLength) - Lowest(low, effRatioLength));
}

def FastSF = 2 / (fastLength + 1);
def SlowSF = 2 / (slowLength + 1);
def ScaledSF = ER * (FastSF - SlowSF) + SlowSF;
def AMA = CompoundValue(1, AMA[1] + Sqr(ScaledSF) * (price - AMA[1]),
price);

# Calculate slope
def slope = (AMA - AMA[slopeLen]) / slopeLen;
def ATR = MovingAverage(AverageType.EXPONENTIAL, TrueRange(high, close, 
low), 50);

plot KAMASlope = if atradjust
   then slope/ATR
   else slope;
plot zeroLine = 0;
