/**
 * Ssi/Web/js/mon.js
 *
 * Copyright 2015 GILLARDEAU Thibaut (aka Thibautg16)
 *
 * Authors :
 *  - Gillardeau Thibaut (aka Thibautg16)
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * You may not use this file except in compliance with the License.
 * A copy of the License is located at
 *
 * http://www.apache.org/licenses/LICENSE-2.0.txt
 *
 * or in the "license" file accompanying this file. This file is distributed
 * on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
 * express or implied. See the License for the specific language governing
 * permissions and limitations under the License.
 */ 

/* Requêtes AJAX */
function AjaxClick(zone, action){	
	$('#'+zone).css('display','inherit');
	
	$.ajax({
		type:"POST",
		url:action,
		error: function(jqXHR, textStatus, errorThrown) { $('#'+zone).html('error')},
		success: function(htmlResponse) { $(zone).show("fast"); $('#'+zone).html(htmlResponse); }
	});
}

function NetatmoModuleListe(){
	var ListeModule = new Array();
	var ListeModuleValue = new Array();
	ListeModule = ["Intérieur", "Extérieur", "Pluviomètre"];
	ListeModule["Intérieur"] = ["Temperature", "CO2", "Humidité", "Pression", "Bruit"];
	ListeModule["Extérieur"] = ["Temperature", "Humidité"];
	ListeModule["Pluviomètre"] = ["Pluviométrie"];
	
	ListeModuleValue = ["Intérieur", "Extérieur", "Pluviomètre"];
	ListeModuleValue["Intérieur"] = ["Temperature", "CO2", "Humidity", "Pressure", "Noise"];
	ListeModuleValue["Extérieur"] = ["Temperature", "Humidity"];
	ListeModuleValue["Pluviomètre"] = ["Rain"];
	
	//Construction de la liste déroulante
	var l = $("#lst_module" ).val();
	var l1 = ListeModule[l];
	var l2 = ListeModuleValue[l];
	
	// On vide la zone
	$("#lst_type").html("");
	
	//Nb d'élément dans le tableau 
	var $nb = l1.length -1;
	
	for (i=0; i<=$nb; i++){
		$("#lst_type").append("<option value='"+l2[i]+"'>"+l1[i]+"</option>");
	}
	
	GraphClick();
}

function GraphClick(){
	var periode = document.getElementById('lst_periode').value;
	var module = document.getElementById('lst_module').value;
	var type  = document.getElementById('lst_type').value;
	
	$('#zone').css('display','inherit');
	$('#zone').html('En cours de chargement - Merci de patienter')	
		
	$.ajax({
		type:"POST",
		url:document.getElementById('chemin').value,
		data:{periode:periode, type:type, module:module},
		error: function(jqXHR, textStatus, errorThrown) { $('#zone').html('error')},
		success: function(htmlResponse) { $('#zone').show("fast"); $('#zone').html(htmlResponse);}
	});
}

function EedomusGraph(){
	var periode = document.getElementById('lst_periode').value;
	var periph_id = document.getElementById('lst_periph').value;
	
	$('#zone').css('display','inherit');
	$('#zone').html('En cours de chargement - Merci de patienter')	
		
	$.ajax({
		type:"POST",
		url:document.getElementById('chemin').value,
		data:{periode:periode, periph_id:periph_id},
		error: function(jqXHR, textStatus, errorThrown) { $('#zone').html('error')},
		success: function(htmlResponse) { $('#zone').show("fast"); $('#zone').html(htmlResponse);}
	});
}


/***** "Calculatrice" JS *****/
function CalculGain(){
	var prixVente   = parseFloat($('#form_prixVente').val().replace(',','.')) || 0;
	var fraisSite   = parseFloat($('#form_fraisSite').val().replace(',','.')) || 0;
	var fraisPort   = parseFloat($('#form_fraisPort').val().replace(',','.')) || 0;
	var fraisPaypal = parseFloat($('#form_fraisPaypal').val().replace(',','.')) || 0;
	var gain = 0;
	
	gain = prixVente - fraisSite - fraisPort - fraisPaypal;
	gain = String(gain).replace('.',',');
	
	$('#form_gain').val(gain);
}

$(document).ready(function() {
        //Tabs jquery pour différentes pages
		$( "#tabs" ).tabs();
		
		//Footable
		jQuery(function($){
			$('.footable').footable();
		});
	
	//On regarde l'url courante afin d'appliquer les changements necessaires
	var Route = document.location.pathname;

	if(Route == '/produit/ajouter'){
		//Gestion liste dynamique "modele" pour la creation d'un produit
		$('#liste_types' ).change(function() {
			//recuperation de l'id du type
			var idType = $("select[id='liste_types'] option:selected" ).val();
			
			//recuperation de la liste des modeles disponibles en Ajax
			AjaxClick('Produit_modele', '/modele/getModeleType/'+idType);
		});
	}
	
	// initialisation function pour les formulaire ajax
    initAjaxForm();
})

//Menu déroulant multi-niveau
$(function(){
	$(".dropdown-menu > li > a.trigger").on("click",function(e){
		var current=$(this).next();
		var grandparent=$(this).parent().parent();
		if($(this).hasClass('left-caret')||$(this).hasClass('right-caret'))
			$(this).toggleClass('right-caret left-caret');
		grandparent.find('.left-caret').not(this).toggleClass('right-caret left-caret');
		grandparent.find(".sub-menu:visible").not(current).hide();
		current.toggle();
		e.stopPropagation();
	});
	$(".dropdown-menu > li > a:not(.trigger)").on("click",function(){
		var root=$(this).closest('.dropdown');
		root.find('.left-caret').toggleClass('right-caret left-caret');
		root.find('.sub-menu:visible').hide();
	});
});

//Formulaire ajax
function initAjaxForm(){
    $('body').on('submit', '.ajax-form', function (e) {

        e.preventDefault();
		zone="form_designation";

        $.ajax({
            type: $(this).attr('method'),
            url: $(this).attr('action'),
            data: $(this).serialize(),
			error: function(jqXHR, textStatus, errorThrown) { $('#'+zone).html('error')},
			success: function(htmlResponse) { $('#'+zone).show("fast"); $('ajouterDesignation').html(''); $('#'+zone).html(htmlResponse)},
        })
    });
}