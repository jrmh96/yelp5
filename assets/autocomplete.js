jQuery(function () 
 {
	 jQuery("#f_elem_city").autocomplete({
		source: function (request, response) {
		 $.ajax({
			 url: "https://maps.googleapis.com/maps/api/place/autocomplete/jsonp?input="+request.term+"&types=(cities)&key=AIzaSyAsILsPM6pNu6y7QRs0rhubHmRmehqXT3g",
			 dataType:"json",
			 data:{
				 maxRows:10,
				 style:"medium",
				 featureClass: "P",
				 continentCode: ["US"],
			 }
		 })
		},
		minLength: 3,
		select: function (event, ui) {
		 var selectedObj = ui.item;
		 jQuery("#f_elem_city").val(selectedObj.value);
		getcitydetails(selectedObj.value);
		 return false;
		},
		open: function () {
		 jQuery(this).removeClass("ui-corner-all").addClass("ui-corner-top");
		},
		close: function () {
		 jQuery(this).removeClass("ui-corner-top").addClass("ui-corner-all");
		}
	 });
	 jQuery("#f_elem_city").autocomplete("option", "delay", 100);
	});