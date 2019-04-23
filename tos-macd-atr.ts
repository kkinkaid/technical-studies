#
# ATR (Volatility) Adjusted MACD
# Modified the default ToS MACD script to include an ATR adjustment (for price and volatility)
# Also allowed for a source price other than "close" (default to hlc3)
#

declare lower;

input fastLength = 12;
input slowLength = 26;
input MACDLength = 9;
input ATRLength = 14;
input averageType = AverageType.EXPONENTIAL;
input showBreakoutSignals = no;
input srcData = hlc3;

plot Value = (MovingAverage(averageType, srcData, fastLength) - MovingAverage(averageType, srcData, slowLength)) / ATR(ATRLength);
plot Avg = MovingAverage(averageType, Value, MACDLength);

plot Diff = Value - Avg;
plot ZeroLine = 0;

plot UpSignal = if Diff crosses above ZeroLine then ZeroLine else Double.NaN;
plot DownSignal = if Diff crosses below ZeroLine then ZeroLine else Double.NaN;

UpSignal.SetHiding(!showBreakoutSignals);
DownSignal.SetHiding(!showBreakoutSignals);

Value.SetDefaultColor(GetColor(1));
Avg.SetDefaultColor(GetColor(8));
Diff.SetDefaultColor(GetColor(5));
Diff.SetPaintingStrategy(PaintingStrategy.HISTOGRAM);
Diff.SetLineWeight(3);
Diff.DefineColor("Positive and Up", Color.GREEN);
Diff.DefineColor("Positive and Down", Color.DARK_GREEN);
Diff.DefineColor("Negative and Down", Color.RED);
Diff.DefineColor("Negative and Up", Color.DARK_RED);
Diff.AssignValueColor(if Diff >= 0 then if Diff > Diff[1] then Diff.Color("Positive and Up") else Diff.Color("Positive and Down") else if Diff < Diff[1] then Diff.Color("Negative and Down") else Diff.Color("Negative and Up"));
ZeroLine.SetDefaultColor(GetColor(0));
UpSignal.SetDefaultColor(Color.UPTICK);
UpSignal.SetPaintingStrategy(PaintingStrategy.ARROW_UP);
DownSignal.SetDefaultColor(Color.DOWNTICK);
DownSignal.SetPaintingStrategy(PaintingStrategy.ARROW_DOWN);
