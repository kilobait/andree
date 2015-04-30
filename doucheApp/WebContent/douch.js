//objects
function Member(){
	this.name;
	this.payments=[];

}
Member.prototype.test = function() {alert('member test');} 
Member.prototype.getTotal = function() {
	var tot=0;
	for(var pay in this.payments){
			tot+=this.payments[pay];
	}
	return tot;
} 
Member.prototype.addPayment = function(sum) {this.payments.push(sum);} 


function Group(){
	this.name="";
	this.members = [];
}
Group.prototype.test = function() {} 
Group.prototype.getTotal = function() {
	var tot=0;
	for (var mem in this.members){
		var m = this.members[mem];
		tot+=m.getTotal();		
	}
	return tot;
} 

Group.prototype.addMember = function(member) {
	this.members.push(member);
} 

var groups = [];

//generate values for testing/demo

var g = new Group();
g.name = "Skole2";

//members
var me  = new Member();
me.name="You";
g.members.push(me);

var one = new Member();
one.name="Jonas";
one.payments.push(20);
g.members.push(one);

var two = new Member();
two.name="Karl";
two.payments.push(50);
g.members.push(two);

groups.push(g);


var activeGroup=0;



//init
$( document ).ready( function () {
	init();
	populateMainPage();


	
});


function init(){
	//group page register
	//register payments onClick
	$("#payment-btn").click(function(event, ui){
		var sum=$('#payment-sum').val();
		if(!isNaN(sum)){
			//is a number
			for (var mem in groups[activeGroup].members){
				if(groups[activeGroup].members[mem].name==me.name){
					//same name as user
					groups[activeGroup].members[mem].addPayment(parseInt(parseFloat(sum)));
					break;
				}
			}
			$('#pay-popup').popup("close");
			populateGroupPage(activeGroup);
		}else{
			alert('it needs to be a number:'+sum);
		}
    }); 
}

function createGroup(){
	var name = $('#text-1').val();
	alert(name);
	if(name){
		var gr = new Group();
		gr.name=name;
	  	gr.members.push(me);
	  	groups.push(gr);
	  	populateMainPage();
  	    $(':mobile-pagecontainer').pagecontainer('change', '#main', {
    		transition: 'flip',
	        changeHash: false,
	        reverse: true,
	        showLoadMsg: true
	    });
	}else{
		alert("it needs a name");
	}

}

function pay(){
	var sum=$('payment-sum').val();
	if(!isNaN(sum)){
		//is a number
		for (var mem in groups[activeGroup].members){
			if(groups[activeGroup].members[mem].name==me.name){
				//same name as user
				groups[activeGroup].members[mem].addPayment(parseInt(sum));
				break;
			}
		}
		populateGroupPage(activeGroup);
	}else{
		alert('it needs to be a number');
	}
}

function populateGroupPage(id){
	//set group as active
	activeGroup=id;

	//clear the listview
	$( "#payment-list" ).empty();

	//populating list
	var g = groups[id];
	for(var mem in g.members){
		var m=g.members[mem];
		$('#payment-list').append('<li><a class="payment-btn" data-id="'+ mem +'" href="#group">'+m.name+'<span class="ui-li-count">'+m.getTotal()+'kr</span></a></li>'); //TODO calc total

	}
	

	//set header text
	$('#g-header-text').text(g.name);
	//refresh layout with the new changes
	$( "#payment-list" ).listview().listview( "refresh" ); //refresh the list

}

function populateMainPage(){
	//create the group list
	$('#group-list').empty();
	for(var gr in groups){
		var g=groups[gr];
		$('#group-list').append('<li><a class="group-btn" data-id="'+ gr +'" href="#group">'+g.name+'<span class="ui-li-count">'+g.getTotal()+'kr</span></a></li>'); //TODO calc total

	}
	//register group onClick
	$(".group-btn").click(function(event, ui){
        var data_id = $(this).data('id');
        populateGroupPage(data_id);
    }); 


	//refresh layout with the new changes
	$( "#group-list" ).listview().listview( "refresh" ); //refresh the list
}

//click events

/*$("#verify").click(function (e) {
    
});*/
