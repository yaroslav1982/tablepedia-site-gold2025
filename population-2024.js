// Axis coordinates
var h1 = 20;   // Minimum x-axis value
var h2 = 350;  // Maximum x-axis value

// Plot sizes
var v1 = 350;  // Minimum y-axis value
var v2 = 20;   // Maximum y-axis value not clearly defined; typically it's the reverse.

// Plot parameters
var OXaxis = h1; // Origin x-axis value
var OYaxis = v1; // Origin y-axis value
var fsize = "12";   // Font size for labels or text
var plotColor = "red"; // Color for the plot
var plotColor2 = "blue"; // Color for the plot

// Temp elements
var elements = ['', '']; // Placeholder for elements, not further defined
var sTemp = ""; // Temporary string variable for various purposes

// X data
var x1=0; var x2=0; 
// Y data
var y1=0; var y2=0;

function PLOTbuild(xText, xSM, xSM2, xFT, ymini, ymaxi) {


    const Yft10 = document.getElementById("inputTextToSave2").value;
var yLE=Yft10.length;
if (yLE>5) {ymaxi=Yft10;}


var ymin=[];
			var text = ymini;
			var array = text.split(';'); // get array, containing file strings
			for (var i = 0; i < array.length; i++) 
			{
				var p4 = parseFloat(array[i]);
				ymin.push(p4);
			}
//alert(ymin);

var ymax=[];
			text = ymaxi;
			array = text.split(';'); // get array, containing file strings
			for (i = 0; i < array.length; i++) 
			{
				p4 = parseFloat(array[i]); 
				ymax.push(p4);
			}
//alert(ymax);


//cmini=cmini2.toString();

//alert('1');

    const targ = document.getElementById('target').value;
    const tableStringsT = targ.split("\n");

    var ycol = document.getElementById(xSM).options.selectedIndex;
    var ycol2 = document.getElementById(xSM2).options.selectedIndex;

var realYmin=ymin[ycol];
var realYsrav=ymin[ycol2];

if (realYmin > realYsrav) { realYmin = realYsrav; }

var realYmax=ymax[ycol];
realYsrav=ymax[ycol2];

if (realYmax < realYsrav) { realYmax = realYsrav; }


//alert('2');

    const ft1 = fitRange1(realYmin, realYmax, 10);

//alert(ft1);

    const ft2 = NUMBERseries(ft1);
//    const FromToX = "1980;1990;2000;2010;2020";


    const Xft10 = document.getElementById("inputTextToSave1").value;
//alert(Xft10);

var tLE=Xft10.length;


///if (tLE>5) {alert(Xft10);}

//    const Xft200 = NUMBERseries(Xft10);

//alert(Xft200);

///    var Xft200 = NUMBERseries(Xft10);
//    xFT=Xft2;
//alert(xFT);

    var FromToX = xFT;

if (tLE>5) {FromToX=Xft10;}


/////////////////
    var pieces222 = FromToX.split(";");
    var qx222 = pieces222.length - 1;
    //let result = "";
    
    var xx100 = parseFloat(pieces222[0]);
    var xx200 = parseFloat(pieces222[qx222]);
//////////////////

x1=xx100;
x2=xx200;

    const OXscale = TEXTscale(FromToX, h1, h2);
    const OYscale = TEXTscale(ft2, v1, v2);
    const stringsOX = OXscale.split("\n");
    const stringsOY = OYscale.split("\n");

    let SIMPLEpoly = tableStringsT.slice(1, -1).map(row => {
        const elements = row.split("\t");
        const sTemp = `${elements[0]};${elements[ycol]}`;
        return convert2ValuesTo2Coordinates(sTemp, x1, x2, y1, y2, h1, h2, v1, v2);
    }).join('\n').replace(/;/g, ',');

    let SIMPLEpoly2 = tableStringsT.slice(1, -1).map(row => {
        const elements = row.split("\t");
        const sTemp = `${elements[0]};${elements[ycol2]}`;
        return convert2ValuesTo2Coordinates(sTemp, x1, x2, y1, y2, h1, h2, v1, v2);
    }).join('\n').replace(/;/g, ',');

//alert('3');

    let sSVG = `<polyline fill='none' stroke='${plotColor}' stroke-width='1' points='${SIMPLEpoly}' />\n`;

//alert('31');

sSVG += `<polyline fill='none' stroke='${plotColor2}' stroke-width='1' points='${SIMPLEpoly2}' />\n`;
//alert('32');

    sSVG += `<polyline fill='none' stroke='#000000' stroke-width='0.5' points='${h1},${OYaxis} ${h2},${OYaxis}' />`;

//alert('35');

    stringsOX.forEach(line => {
        const elements = line.split("\t");
        const nOXsh2 = parseFloat(elements[1]) - 4;
        const nOYsh3 = OYaxis + 18;
        sSVG += `\n<polyline fill='none' stroke='#000000' stroke-width='0.5' points='${elements[1]},${OYaxis-340} ${elements[1]},${OYaxis + 10}' />`;
        sSVG += `\n<text x='${nOXsh2}' y='${nOYsh3}' fill='black' font-family='Arial' font-size='${fsize-2}'>${elements[2]}</text>`;
    });

//alert('4');


    sSVG += `\n<polyline fill='none' stroke='#000000' stroke-width='0.5' points='${OXaxis},${v1} ${OXaxis},${v2}' />`;
    sSVG += `\n<polyline fill='none' stroke='#000000' stroke-width='0.5' points='${OXaxis+350},${v1} ${OXaxis+350},${v2}' />`;

    stringsOY.forEach((line, i) => {
        const elements = line.split("\t");
        const sTemp = i === stringsOY.length - 1 ? document.getElementById(xSM).options[ycol].text : elements[2];
        sSVG += `\n<polyline fill='none' stroke='#000000' stroke-width='0.5' points='${OXaxis},${elements[1]} ${OXaxis + 10},${elements[1]}' />`;
        sSVG += `\n<text x='${OXaxis + 10}' y='${elements[1]}' fill='${plotColor}' font-family='Arial' font-size='${fsize}'>${sTemp}</text>`;

        const sTemp2 = i === stringsOY.length - 1 ? document.getElementById(xSM2).options[ycol2].text : elements[2];
        sSVG += `\n<polyline fill='none' stroke='#000000' stroke-width='0.5' points='${OXaxis+320},${elements[1]} ${OXaxis + 330},${elements[1]}' />`;
        sSVG += `\n<text x='${OXaxis + 300}' y='${elements[1]}' fill='${plotColor2}' font-family='Arial' font-size='${fsize}'>${sTemp2}</text>`;
    });

//alert('5');


    document.getElementById(xText).innerHTML = `<svg version='1.1' width='370' height='370' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'>${sSVG}\n</svg>`;
}

function TEXTscale(x1xN, min4, max4) {
    const pieces = x1xN.split(";");
    const qx = pieces.length - 1;
    let result = "";
    
    const xx1 = parseFloat(pieces[0]);
    const xx2 = parseFloat(pieces[qx]);
    const range = xx2 - xx1;
    const scale = max4 - min4;

    for (let i = 0; i < qx; i++) {
        const xAmong = parseFloat(pieces[i]);
        const part = (xAmong - xx1) / range;
        const smart2 = NUMBERfloat(scale * part + min4, 0.001);
        result += `${xAmong}\t${smart2}\t${xAmong}\n`;
    }

    const coo = NUMBERfloat(max4, 0.0001);
    result += `${xx2}\t${coo}\t${xx2}`;
    
    return result;
}

function convert2ValuesTo2Coordinates(xy, x1, x2, y1, y2, xa41, xa42, ya41, ya42) {
    const [xValue, yValue] = xy.split(";");
    const xCoordinate = convert1ValueTo1Coordinate(x1, x2, xa41, xa42, xValue);
    const yCoordinate = convert1ValueTo1Coordinate(y1, y2, ya41, ya42, yValue);
    return `${xCoordinate};${yCoordinate}`;
}

function convert1ValueTo1Coordinate(zx1, zx2, a1, a2, xVECTOR1) {
    return ((a2 - a1) * (xVECTOR1 - zx1) / (zx2 - zx1)) + a1;
}

function NUMBERfloat(xbig, xsmall) {
    const vmax = Math.ceil(xbig / xsmall) * xsmall;
    return parseFloat(vmax.toFixed(10));
}

function fitRange1(a, b, nLines) {
    let xr = Math.abs(b - a) / nLines;
    let mimi = Math.abs(a / xr) / nLines * 5;

    if (mimi < 1) {
        a = 0;
        xr = Math.abs(b - a) / nLines;
    }

    const loga = Math.log10(xr);
    let deca = Math.pow(10, Math.floor(loga));
    let mi1 = Math.floor(a / deca);
    let ma1 = Math.ceil(b / deca);
    let iFlag = 0;

    if ((ma1 - mi1) > (nLines * 2)) {
        deca *= 5;
        mi1 = Math.floor(a / deca);
        ma1 = Math.ceil(b / deca);
        iFlag++;
    }

    if ((ma1 - mi1) > nLines) {
        deca *= 2;
        mi1 = Math.floor(a / deca);
        ma1 = Math.ceil(b / deca);
        iFlag--;
    }

    const mi2 = mi1 * deca;
    const ma2 = ma1 * deca;
    return `${mi2};${ma2};${deca}`;
}

function NUMBERseries(fts)
{
	var FromToStep = fts.split(";");
	var sFrom = FromToStep[0]; y1 = parseFloat(sFrom);
	var sTo = FromToStep[1]; y2 = parseFloat(sTo);
	var sStep = FromToStep[2]; var vStep = parseFloat(sStep); 
    let result = [];

    for (let x = y1; x < y2; x += vStep) {
        result.push(NUMBERfloat(x, vStep));
    }
    result.push(y2);

    return result.join(";");
}