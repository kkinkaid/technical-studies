# res is the heikinashi candle timeframe
#input res = 30;
input ha_timeframe = AggregationPeriod.THIRTY_MIN;
# Look at prev day's (or more) HA values
input hashift = 1;
# HA EMA Timeframe
input aggSlow = AggregationPeriod.FOUR_HOURS;
# Calc EMA based on today (or yesteday's) HA value 
input mhshift = 0;
# fama slows the transition from one EMA value to another
input fama = 1;
# Shifts ema from one candle to another
input EMAShift = 0;
input slowma = 30;
# offset for ema
input slowmas = 1;

def haclose = (open[hashift] + high[hashift] + low[hashift] + close[hashift]) / 4;
#def haopen = CompoundValue(1, (haopen[hashift + 1] + haclose[hashift + 1]) / 2, (open[1] + close[1]) / 2);
def mhaclose = (open(period = aggSlow) + high(period = aggSlow) + low(period = aggSlow) + close(period = aggSlow)) / 4;

plot fastExp = ExpAverage(mhaclose[EMAShift], fama);
plot slowExp = ExpAverage(close(period = ha_timeframe)[slowmas], slowma);

# TODO: 2019-06-19
# FastExp line (blue on TOS, green on TV) do not equal each other
# also, they do not change values at the same time (about 1.5 hrs apart)
