#
# TD Ameritrade IP Company, Inc. (c) 2008-2019
# Updates by Kyle Kinkaid, imlepid@gmail.com, 2019
# Calculates the height of a Heikin Ashi cadle and the height of the shadow in the "opposite" direction of movement
#

declare lower;

input smoothingLength = 3;
input ATRLength = 50;

def haclose = ((open + high + low + close) / 4);
def haopen = (CompoundValue(1, (haopen[1] + haclose[1]) / 2, ((open[1] + close[1]) / 2)));
def diff = haclose - haopen;
def halow = Min(Min(haopen, haclose), low);
def hahigh = Max(Max(haopen, haclose), high);
def shadow;

if haopen < haclose {
   shadow = haopen - halow; 
} else {
   shadow = haopen - hahigh;
}

plot HADiff = diff / ATR(ATRLength);
plot Avg = Average(diff, smoothingLength)/ ATR(ATRLength);
plot HAShadow = shadow / ATR(ATRLength);
plot ZeroLine = 0;

HADiff.SetDefaultColor(GetColor(1));
Avg.SetDefaultColor(GetColor(8));
ZeroLine.SetDefaultColor(GetColor(5));
