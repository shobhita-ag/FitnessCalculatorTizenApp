
$(function(){
	

var w_bmi = [19, 24, 30, 40],
m_bmi = [20, 25, 30, 40],
c_bmi_percentile = [5, 85, 95, 99],
c_b_bmi = [[13.7, 19.2, 21.1], [14.3, 19.3, 22.6], [13.8, 19.4, 21.6], [14.7, 21.4, 25.0], [14.4, 21.2, 23.0], [14.9, 22.0, 24.8], [16.3, 21.7, 24.5], [16.8, 22.6, 25.7], 
           [17.9, 23.1, 25.9], [18.6, 23.7, 26], [18.7, 23.7, 25.8], [18.7, 24.0, 26.8]],
c_g_bmi = [[13.3, 18.2, 23.1], [13.3, 18.8, 22.3], [13.8, 19.8, 23.4], [14.3, 20.7, 23.4], [14.8, 20.8, 22.9], [15.1, 21.5, 23.4], [15.7, 22.0, 24.4], [17.1, 23.2, 26.0],
           [17.7, 23.2, 27.6], [17.9, 22.8, 24.2], [17.9, 23.4, 25.7], [18.4, 23.5, 25.0]],
w_wth = [0.42, 0.49, 0.54, 0.58], 
m_wth = [0.43, 0.53, 0.58, 0.63],
ideal_wth = [0.5, 0.6],
tdee_param = [1.2, 1.375, 1.55, 1.725, 1.9],
w_bfp = [[15, 25, 29], [15, 26, 30], [16, 27, 31], [16, 28, 32], [16, 29, 33], [16, 30, 34], [16, 30, 35], 
         [17, 31, 36], [19, 32, 37], [21, 33, 39], [23, 35, 40], [24, 36, 42]],
m_bfp = [[13, 20, 25], [13, 21, 26], [13, 22, 27], [13, 23, 28], [12, 22, 27], [12, 21, 26], [11, 21, 24], 
         [10, 20, 24], [9, 20, 24], [8, 19, 25], [11, 22, 27], [13, 25, 30]];

var reset = function(){
		$("#id_result").html("");
		$("#id_underweight").html("<" + 0);
		$("#id_normal").html(0 +"-"+ 0);
		$("#id_overweight").html(0 +"-"+ 0);
		$("#id_obese").html(0 +"-"+ 0);
		$("#id_morbidly_obese").html(">" + 0);
		$("#id_age").val("");
		$("#id_height").val("");
		$("#id_weight").val("");
		$("#id_ideal_bmi").html(0 +"-"+ 0);
		$("#id_ideal_wt").html(0 +"-"+ 0);
		$('#id_ht_metric').val("cm").change();
		$('#id_wt_metric').val("kg").change();
		$('#id_gender').val("woman").change();
		
		$("#id_height_2").val("");
		$("#id_waist_2").val("");
		$("#id_age_2").val("");
		$("#id_result_2").html("");
		$("#id_underweight_2").html("<" + 0);
		$("#id_normal_2").html(0 +"-"+ 0);
		$("#id_overweight_2").html(0 +"-"+ 0);
		$("#id_obese_2").html(0 +"-"+ 0);
		$("#id_morbidly_obese_2").html(">" + 0);
		$("#id_ideal_wth").html(0 +"-"+ 0);
		$("#id_ideal_waist").html(0 +"-"+ 0);
		$('#id_ht_metric_2').val("cm").change();
		$('#id_waist_metric_2').val("cm").change();
		$('#id_gender_2').val("woman").change();
		
		$("#id_age_3").val("");
		$("#id_height_3").val("");
		$("#id_weight_3").val("");
		$("#id_bmr_3").html(0);
		$("#id_tdee_3").html(0);
		$('#id_ht_metric_3').val("cm").change();
		$('#id_wt_metric_3').val("kg").change();
		$('#id_activity_3').val("moderate").change();
		$('#id_gender_3').val("woman").change();
	
		$("#id_height_4").val("");
		$("#id_waist_4").val("");
		$("#id_age_4").val("");
		$("#id_neck_4").val("");
		$("#id_hip_4").val("");
		$("#id_bfp_4").html(0);
		$("#id_low_4").html("<" + 0);
		$("#id_normal_4").html(0 + "-" + 0);
		$("#id_high_4").html(0 + "-" + 0);
		$("#id_vhigh_4").html(">" + 0);
		$('#id_ht_metric_4').val("cm").change();
		$('#id_waist_metric_4').val("cm").change();
		$('#id_neck_metric_4').val("cm").change();
		$('#id_hip_metric_4').val("cm").change();	
		$('#id_gender_4').val("woman").change();
		
		
		$("#row1").removeClass("paintBMI");
		$("#row2").removeClass("paintBMI");
		$("#row3").removeClass("paintBMI");
		$("#row4").removeClass("paintBMI");
		$("#row5").removeClass("paintBMI");
		$("#row6").removeClass("paintBMI");
		$("#row7").removeClass("paintBMI");
		$("#row8").removeClass("paintBMI");
		$("#row9").removeClass("paintBMI");
		$("#row10").removeClass("paintBMI");
		$("#row11").removeClass("paintBMI");
		$("#row12").removeClass("paintBMI");
		$("#row13").removeClass("paintBMI");
		$("#row14").removeClass("paintBMI");
		drawChartWTH();
};

var calculateBMI = function(){
	var ht = $("#id_height").val(),
	wt = $("#id_weight").val(),
	age = $("#id_age").val(),
	gender = $("#id_gender").val(),
	ht_metric = $("#id_ht_metric").val(),
	wt_metric = $("#id_wt_metric").val(),
	bmi = 0,
	ct = 0, min = 0, mid = 0, max = 0;
	if (ht === '' || wt === '' || ht <= 0 || wt <= 0){
		$("#id_result").html(bmi);
		return;
	}
	if(ht_metric === "cm"){
		ht = ht * 0.01;
	}else if(ht_metric === "feet"){
		ht = ht * 0.3048;
	}
	
	if(wt_metric === "lb"){
		wt = wt * 0.453592;
	}
	
	bmi = wt/(ht*ht);
	bmi = bmi.toFixed(2);
	$("#id_result").html(bmi);
	$("#id_result").show();
	
	//Removing classname from all rows
	$("#row1").removeClass("paintBMI");
	$("#row2").removeClass("paintBMI");
	$("#row3").removeClass("paintBMI");
	$("#row4").removeClass("paintBMI");
	$("#row5").removeClass("paintBMI");
	
	if( age >= 19){
		if(gender === "woman"){
			switch (true){
			case (bmi < w_bmi[0]):
				$("#row1").addClass("paintBMI");break;
			case (bmi >= w_bmi[0] && bmi < w_bmi[1]):
				$("#row2").addClass("paintBMI");break;
			case (bmi >= w_bmi[1] && bmi < w_bmi[2]):
				$("#row3").addClass("paintBMI");break;
			case (bmi >= w_bmi[2] && bmi < w_bmi[3]):
				$("#row4").addClass("paintBMI");break;
			case (bmi >= w_bmi[3]):
				$("#row5").addClass("paintBMI");break;
			default:
				break;
			}
		}else if (gender === "man"){
			switch (true){
			case (bmi < m_bmi[0]):
				$("#row1").addClass("paintBMI");break;
			case (bmi >= m_bmi[0] && bmi < m_bmi[1]):
				$("#row2").addClass("paintBMI");break;
			case (bmi >= m_bmi[1] && bmi < m_bmi[2]):
				$("#row3").addClass("paintBMI");break;
			case (bmi >= m_bmi[2] && bmi < m_bmi[3]):
				$("#row4").addClass("paintBMI");break;
			case (bmi >= m_bmi[3]):
				$("#row5").addClass("paintBMI");break;
			default:
				break;
			}			
		}
	}else if ( age >= 7 && age < 19){
		ct = 7;
		if(gender === "man"){
			min = c_b_bmi[(age-ct).toFixed()][0];
			mid = c_b_bmi[(age-ct).toFixed()][1];
			max = c_b_bmi[(age-ct).toFixed()][2];
		}else{
			min = c_g_bmi[(age-ct).toFixed()][0];
			mid = c_g_bmi[(age-ct).toFixed()][1];
			max = c_g_bmi[(age-ct).toFixed()][2];
		}
		switch (true){
		case (bmi < min):
			$("#row1").addClass("paintBMI");break;
		case (bmi >= min && bmi < mid):
			$("#row2").addClass("paintBMI");break;
		case (bmi >= mid && bmi < max):
			$("#row3").addClass("paintBMI");break;
		case (bmi >= max):
			$("#row4").addClass("paintBMI");break;
		default:
			break;
		}			
		
		
	}
	
};

var drawChartBMI = function(){
	var age = $("#id_age").val(),
	gender = $("#id_gender").val(),
	ct = 0, min = 0, mid = 0, max = 0;	
	if( age >= 19 && gender === "woman"){
		$("#id_underweight").html("<" + w_bmi[0]);
		$("#id_normal").html(w_bmi[0] + "-" + w_bmi[1]);
		$("#id_overweight").html(w_bmi[1] + "-" + w_bmi[2]);
		$("#id_obese").html(w_bmi[2] + "-" + w_bmi[3]);
		$("#id_morbidly_obese").html(">=" + w_bmi[3]);
		
		$("#id_ideal_bmi").html(w_bmi[0] + "-" + w_bmi[1]);
	}else if( age >= 19 && gender === "man"){
		$("#id_underweight").html("<" + m_bmi[0]);
		$("#id_normal").html(m_bmi[0] + "-" + m_bmi[1]);
		$("#id_overweight").html(m_bmi[1] + "-" + m_bmi[2]);
		$("#id_obese").html(m_bmi[2] + "-" + m_bmi[3]);
		$("#id_morbidly_obese").html(">=" + m_bmi[3]);
		
		$("#id_ideal_bmi").html(m_bmi[0] + "-" + m_bmi[1]);
	}else if ( age >= 7 && age < 19){
		ct = 7;
		if(gender === "man"){
			min = c_b_bmi[(age-ct).toFixed()][0];
			mid = c_b_bmi[(age-ct).toFixed()][1];
			max = c_b_bmi[(age-ct).toFixed()][2];
		}else{
			min = c_g_bmi[(age-ct).toFixed()][0];
			mid = c_g_bmi[(age-ct).toFixed()][1];
			max = c_g_bmi[(age-ct).toFixed()][2];
		}
		$("#id_underweight").html("<" + min);
		$("#id_normal").html(min + "-" + mid);
		$("#id_overweight").html(mid + "-" + max);
		$("#id_obese").html(">=" + max);
		$("#id_morbidly_obese").html("-");
		
		$("#id_ideal_bmi").html(min + "-" + mid);
	}else{
		$("#id_result").html("");
		$("#id_underweight").html("<" + 0);
		$("#id_normal").html(0 +"-"+ 0);
		$("#id_overweight").html(0 +"-"+ 0);
		$("#id_obese").html(0 +"-"+ 0);
		$("#id_morbidly_obese").html(">" + 0);
		
		$("#id_ideal_bmi").html(0 +"-"+ 0);
		$("#id_ideal_wt").html(0 +"-"+ 0);
	}
	
	$(".bmi").keyup();
};

var drawChartWTH = function(){
	var gender = $("#id_gender_2").val();	
	if( gender === "woman"){
		$("#id_underweight_2").html("<" + w_wth[0]);
		$("#id_normal_2").html(w_wth[0] + "-" + w_wth[1]);
		$("#id_overweight_2").html(w_wth[1] + "-" + w_wth[2]);
		$("#id_obese_2").html(w_wth[2] + "-" + w_wth[3]);
		$("#id_morbidly_obese_2").html(">" + w_wth[3]);
		
		$("#id_ideal_bmi_2").html(w_wth[0] + "-" + w_wth[1]);
	}else if( gender === "man"){
		$("#id_underweight_2").html("<" + m_wth[0]);
		$("#id_normal_2").html(m_wth[0] + "-" + m_wth[1]);
		$("#id_overweight_2").html(m_wth[1] + "-" + m_wth[2]);
		$("#id_obese_2").html(m_wth[2] + "-" + m_wth[3]);
		$("#id_morbidly_obese_2").html(">" + m_wth[3]);
		
		$("#id_ideal_bmi_2").html(m_wth[0] + "-" + m_wth[1]);
	}	
	//$(".bmi").keyup();
};

var getIdealWt = function(){
	var ht = $("#id_height").val(), 
	ideal_wt_min = 0, 
	ideal_wt_max = 0, 
	age = $("#id_age").val(),
	gender = $("#id_gender").val(),
	ht_metric = $("#id_ht_metric").val(),
	ct = 0, mid = 0, min = 0;
	
	if(ht_metric === "cm"){
		ht = ht * 0.01;
	}else if(ht_metric === "feet"){
		ht = ht * 0.3048;
	}

	if( age >= 19 && gender === "woman"){
		if(ht >= 0){
			ideal_wt_min = w_bmi[0]*ht*ht;
			ideal_wt_max = w_bmi[1]*ht*ht;
		}
	}else if( age >= 19 && gender === "man"){
		if(ht >= 0){
			ideal_wt_min = m_bmi[0]*ht*ht;
			ideal_wt_max = m_bmi[1]*ht*ht;
		}
	}else if( age >= 7 && age < 19){
		ct = 7;
		if(gender === "man"){
			min = c_b_bmi[(age-ct).toFixed()][0];
			mid = c_b_bmi[(age-ct).toFixed()][1];
		}else{
			min = c_g_bmi[(age-ct).toFixed()][0];
			mid = c_g_bmi[(age-ct).toFixed()][1];
		}
		if(ht >= 0){
			ideal_wt_min = min*ht*ht;
			ideal_wt_max = mid*ht*ht;
		}
	}
	$("#id_ideal_wt").html(ideal_wt_min.toFixed(2) + "-" + ideal_wt_max.toFixed(2));
	
};

var drawChartBMIandIdealWt = function(){
	drawChartBMI();
	getIdealWt();
	
}
var calculateBmiAndIdealWt = function(){
	calculateBMI();
	getIdealWt();
}


var calculateIdealWaist = function(){
	var age = $("#id_age_2").val(),
	ht = $("#id_height_2").val(),
	ht_metric = $("#id_ht_metric_2").val();
	if( ht <= 0 || ht === ''){
		$("#id_ideal_waist").html(0 + "-" + 0);
		$("#id_ideal_waist").show();
		return;
	}
	if (ht_metric === "feet"){
		ht = ht * 30.48;
	}
	if (age > 0 && age <= 40)
		$("#id_ideal_waist").html("<" + (ideal_wth[0]*ht).toFixed(2));
	else if (age >= 40 && age <= 50)+
		$("#id_ideal_waist").html((ideal_wth[0]*ht).toFixed(2) + "-" + (ideal_wth[1]*ht).toFixed(2));
	else if(age > 50)
		$("#id_ideal_waist").html("<" + (ideal_wth[1]*ht).toFixed(2));
	else
		$("#id_ideal_waist").html(0 + "-" + 0);
}

var calculateIdealWTH = function(){
	var age = $("#id_age_2").val();

	if (age > 0 && age <= 40)
		$("#id_ideal_wth").html("<" + ideal_wth[0]);
	else if (age >= 40 && age <= 50)
		$("#id_ideal_wth").html(ideal_wth[0] + "-" + ideal_wth[1]);
	else if( age > 50 )
		$("#id_ideal_wth").html("<" + ideal_wth[1]);
	else
		$("#id_ideal_wth").html(0 + "-" + 0);
	
	calculateIdealWaist();
}

var calculateWTH = function(){
	var ht= $("#id_height_2").val(),
	waist = $("#id_waist_2").val(),
	gender = $("#id_gender_2").val(),
	ht_metric = $("#id_ht_metric_2").val(),
	waist_metric = $("#id_waist_metric_2").val();
	if (ht === '' || waist === '' || ht <= 0 || waist <= 0){
		$("#id_result_2").html(0);
		calculateIdealWaist();
		return;
	}
	if (ht_metric === "feet"){
		ht = ht * 30.48;
	}
	if (waist_metric === "inches"){
		waist = waist * 2.54;
	}
	var wth = waist/ht;
	wth = wth.toFixed(2);
	$("#id_result_2").html(wth);
	$("#id_result_2").show();

	//Removing classname from all rows
	$("#row6").removeClass("paintBMI");
	$("#row7").removeClass("paintBMI");
	$("#row8").removeClass("paintBMI");
	$("#row9").removeClass("paintBMI");
	$("#row10").removeClass("paintBMI");
	
	if(gender == "woman"){
		switch (true){
		case (wth < w_wth[0]):
			$("#row6").addClass("paintBMI");break;
		case (wth >= w_wth[0] && wth < w_wth[1]):
			$("#row7").addClass("paintBMI");break;
		case (wth >= w_wth[1] && wth < w_wth[2]):
			$("#row8").addClass("paintBMI");break;
		case (wth >= w_wth[2] && wth < w_wth[3]):
			$("#row9").addClass("paintBMI");break;
		case (wth >= w_wth[3]):
			$("#row10").addClass("paintBMI");break;
		default:
			break;
		}
	}else if (gender == "man"){
		switch (true){
		case (wth < m_wth[0]):
			$("#row6").addClass("paintBMI");break;
		case (wth >= m_wth[0] && wth < m_wth[1]):
			$("#row7").addClass("paintBMI");break;
		case (wth >= m_wth[1] && wth < m_wth[2]):
			$("#row8").addClass("paintBMI");break;
		case (wth >= m_wth[2] && wth < m_wth[3]):
			$("#row9").addClass("paintBMI");break;
		case (wth >= m_wth[3]):
			$("#row10").addClass("paintBMI");break;
		default:
			break;
		}			
	}
	calculateIdealWaist();	
}

var calculateBMR = function(){
	var ht = $("#id_height_3").val(),
	wt = $("#id_weight_3").val(),
	age = $("#id_age_3").val(),
	gender = $("#id_gender_3").val(),
	ht_metric = $("#id_ht_metric_3").val(),
	wt_metric = $("#id_wt_metric_3").val(),
	bmr = 0;
	if( ht === '' || wt === '' || age === ''){
		$("#id_bmr_3").html(bmr);
		$("#id_bmr_3").show();
		return;
	}
	if (wt_metric === "lb"){
		wt = wt * 0.453592;
	}
	if (ht_metric === 'feet'){
		ht = ht * 30.48;
	}
	if (gender === 'man')
		bmr = (10 * wt) + (6.25 * ht) - (5 * age) + 5;
	else if (gender === 'woman')
		bmr = (10 * wt) + (6.25 * ht) - (5 * age) - 161;
	
	$("#id_bmr_3").html(bmr.toFixed());
	$("#id_bmr_3").show();
	
	calculateTDEE();
	
}

var calculateTDEE = function(){
	var bmr = $("#id_bmr_3").text(),
	activity = $("#id_activity_3").val(),
	tdee = 0;
	if(bmr > 0){
		switch(true){
		case ( activity === "inactive"):tdee = tdee_param[0] * bmr; break;
		case ( activity === "sedentary"):tdee = tdee_param[1] * bmr; break;
		case ( activity === "moderate"):tdee = tdee_param[2] * bmr; break;
		case ( activity === "vigorous"):tdee = tdee_param[3] * bmr; break;
		case ( activity === "extreme"):tdee = tdee_param[4] * bmr; break;
		default: break;
		}
	}
	$("#id_tdee_3").html(tdee.toFixed());
	$("#id_tdee_3").show();	
}

var calculateBFP = function(){
	var ht = $("#id_height_4").val(),
	waist = $("#id_waist_4").val(),
	neck = $("#id_neck_4").val(),
	hip = $("#id_hip_4").val(),
	age = $("#id_age_4").val(),
	
	gender = $("#id_gender_4").val(),
	ht_metric = $("#id_ht_metric_4").val(),
	waist_metric = $("#id_waist_metric_4").val(),
	neck_metric = $("#id_neck_metric_4").val(),
	hip_metric = $("#id_hip_metric_4").val(),
	bfp = 0;
	if( ht === '' || waist === '' || neck === '' || ht <= 0 || waist <= 0 || neck <=0 || (gender === "women" && ((hip === '') || (hip <= 0)))){
		$("#id_bfp_4").html(bfp);
		$("#id_bfp_4").show();
		drawChartBFP('');
		return;
	}
	
	if( ht_metric === "feet" ){
		ht = ht * 30.48;
	}
	if( waist_metric === "inches" ){
		waist = waist * 2.54;
	}
	if( neck_metric === "inches" ){
		neck = neck * 2.54;
	}
	if( hip_metric === "inches" ){
		hip = hip * 2.54;
	}
	
	if( gender === "man"){
		if((waist - neck) <= 0) 
			bfp = 0;
		else
			bfp = (86.010*Math.log(waist - neck))/Math.LN10 - (70.041*Math.log(ht))/Math.LN10 + 30.29521038;
	}
	else{
		if((waist + hip - neck) <= 0)
			bfp = 0;
		else
			bfp = (163.205*Math.log(waist + hip - neck))/Math.LN10 - (97.684*Math.log(ht))/Math.LN10 - 104.9121099;
	}
	
	$("#id_bfp_4").html(bfp.toFixed(2) + " %");
	$("#id_bfp_4").show();	
	
	drawChartBFP(bfp);
}

var drawChartBFP = function(bfp){
	var age = $("#id_age_4").val(),	
	gender = $("#id_gender_4").val(),
	min, mid, max;
	
	if( age === '')
		return;
	
	if( gender === "man"){
		switch(true){
		case (age < 7): min = 0, max = 0, mid = 0; break;
		case (age == 7): min = m_bfp[0][0], mid = m_bfp[0][1], max = m_bfp[0][2]; break;
		case (age == 8): min = m_bfp[1][0], mid = m_bfp[1][1], max = m_bfp[1][2]; break;
		case (age == 9): min = m_bfp[2][0], mid = m_bfp[2][1], max = m_bfp[2][2]; break;
		case (age >= 10 && age <= 12): min = m_bfp[3][0], mid = m_bfp[3][1], max = m_bfp[3][2]; break;
		case (age == 13): min = m_bfp[4][0], mid = m_bfp[4][1], max = m_bfp[4][2]; break;
		case (age == 14): min = m_bfp[5][0], mid = m_bfp[5][1], max = m_bfp[5][2]; break;
		case (age == 15): min = m_bfp[6][0], mid = m_bfp[6][1], max = m_bfp[6][2]; break;
		case (age >= 16 && age <=18): min = m_bfp[7][0], mid = m_bfp[7][1], max = m_bfp[7][2]; break;
		case (age == 19): min = m_bfp[8][0], mid = m_bfp[8][1], max = m_bfp[8][2]; break;
		case (age >= 20 && age <=39): min = m_bfp[9][0], mid = m_bfp[9][1], max = m_bfp[9][2]; break;
		case (age >= 40 && age <=59): min = m_bfp[10][0], mid = m_bfp[10][1], max = m_bfp[10][2]; break;
		case (age >= 60): min = m_bfp[11][0], mid = m_bfp[11][1], max = m_bfp[11][2]; break;
		}
	}else{
		switch(true){
		case (age < 7): min = 0, max = 0, mid = 0; break;
		case (age == 7): min = w_bfp[0][0], mid = w_bfp[0][1], max = w_bfp[0][2]; break;
		case (age == 8): min = w_bfp[1][0], mid = w_bfp[1][1], max = w_bfp[1][2]; break;
		case (age == 9): min = w_bfp[2][0], mid = w_bfp[2][1], max = w_bfp[2][2]; break;
		case (age == 10): min = w_bfp[3][0], mid = w_bfp[3][1], max = w_bfp[3][2]; break;
		case (age >= 11 && age <= 13): min = w_bfp[4][0], mid = w_bfp[4][1], max = w_bfp[4][2]; break;
		case (age >= 14 && age <=16): min = w_bfp[5][0], mid = w_bfp[5][1], max = w_bfp[5][2]; break;
		case (age == 17): min = w_bfp[6][0], mid = w_bfp[6][1], max = w_bfp[6][2]; break;
		case (age == 18): min = w_bfp[7][0], mid = w_bfp[7][1], max = w_bfp[7][2]; break;
		case (age == 19): min = w_bfp[8][0], mid = w_bfp[8][1], max = w_bfp[8][2]; break;
		case (age >= 20 && age <=39): min = w_bfp[9][0], mid = w_bfp[9][1], max = w_bfp[9][2]; break;
		case (age >= 40 && age <=59): min = w_bfp[10][0], mid = w_bfp[10][1], max = w_bfp[10][2]; break;
		case (age >= 60): min = w_bfp[11][0], mid = w_bfp[11][1], max = w_bfp[11][2]; break;
		}
	}
	$("#id_low_4").html("<" + min);
	$("#id_normal_4").html(min + "-" + mid);
	$("#id_high_4").html(mid + "-" + max);
	$("#id_vhigh_4").html(">" + max);
	
	if( bfp === '')
		return;

	//Removing classname from all rows
	$("#row11").removeClass("paintBMI");
	$("#row12").removeClass("paintBMI");
	$("#row13").removeClass("paintBMI");
	$("#row14").removeClass("paintBMI");

	switch(true){
	case (bfp < min):$("#row11").addClass("paintBMI");break;
	case (bfp >= min && bfp <= mid):$("#row12").addClass("paintBMI");break;
	case (bfp >= mid && bfp <= max):$("#row13").addClass("paintBMI");break;
	case (bfp > max):$("#row14").addClass("paintBMI");break;
	default:break;
	}
	
}

var genderSwitchedBFP = function(){
	var gender = $("#id_gender_4").val();
	if(gender === "man"){
		$("#id_hip_4").prop('disabled', true);
		$("#id_hip_4").attr('placeholder', "For Females only");
		$("#id_hip_4").val("");
	}
	else{
		$("#id_hip_4").prop('disabled', false);
		$("#id_hip_4").attr('placeholder', "Hip");
	}
	calculateBFP();
}


$(document).ready(reset);
$("#id_reset").click(reset);
$("#id_reset_2").click(reset);
$("#id_reset_3").click(reset);
$("#id_reset_4").click(reset);
$("#id_reset_5").click(reset);

//$("#id_age").keyup(drawChartBMI);
$("#page_bmi").on('keyup', "#id_age", drawChartBMIandIdealWt);
$("#page_bmi").on('change', "#id_gender", drawChartBMIandIdealWt);
$("#page_bmi").on('keyup', "#id_weight", calculateBMI);
$("#page_bmi").on('keyup', "#id_height", calculateBmiAndIdealWt);
$("#page_bmi").on('change', "#id_wt_metric", calculateBMI);
$("#page_bmi").on('change', "#id_ht_metric", calculateBmiAndIdealWt);

$("#page_wth").on('change', "#id_gender_2", drawChartWTH);
$("#page_wth").on('keyup', "#id_age_2", calculateIdealWTH);
$("#page_wth").on('keyup', "#id_waist_2", calculateWTH);
$("#page_wth").on('keyup', "#id_height_2", calculateWTH);
$("#page_wth").on('change', "#id_waist_metric_2", calculateWTH);
$("#page_wth").on('change', "#id_ht_metric_2", calculateWTH);

$("#page_bmr").on('keyup', "#id_age_3, #id_weight_3, #id_height_3", calculateBMR);
$("#page_bmr").on('change', "#id_wt_metric_3, #id_ht_metric_3, #id_gender_3", calculateBMR);
$("#page_bmr").on('change', "#id_activity_3", calculateTDEE);

$("#page_bfp").on('change', "#id_ht_metric_4, #id_waist_metric_4, #id_neck_metric_4, #id_hip_metric_4", calculateBFP);
$("#page_bfp").on('keyup', "#id_height_4, #id_waist_4, #id_neck_4, #id_hip_4", calculateBFP);
$("#page_bfp").on('change', "#id_gender_4", genderSwitchedBFP);
$("#page_bfp").on('keyup', "#id_age_4", function(event){drawChartBFP('')});

//$("#id_weight").keyup(calculateBMI);
//$("#id_height").keyup(calculateBmiAndIdealWt);
//$("#id_ht_metric").on('change',calculateBmiAndIdealWt);
//$("#id_wt_metric").on('change',calculateBMI);
});
