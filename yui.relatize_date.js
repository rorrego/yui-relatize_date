YUI.add('project-date', function(Y){
	Y.date={
		shortDays: [ 'Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab' ],
		days: ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'],
		shortMonths: [ 'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dec' ],
		months: [ 'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre' ],
		relatize: function(elements){
			Y.all(elements).each(function(e){
				e.setContent(Y.date.timeAgoInWords(new Date(e.getAttribute('title'))));
				});			
		},
		showTime: function(elements){
			Y.all(elements).each(function(e){
				e.setContent(Y.date.strftime(new Date(e.getAttribute('title')),'%I:%M %p'));
				});			
		},
	    strftime: function(date, format) {
	      var day = date.getDay(), month = date.getMonth();
	      var hours = date.getHours(), minutes = date.getMinutes();

	      var pad = function(num) { 
	        var string = num.toString(10);
	        return new Array((2 - string.length) + 1).join('0') + string
	      };

	      return format.replace(/\%([aAbBcdHImMpSwyY])/g, function(part) {
	        switch(part[1]) {
	          case 'a': return Y.date.shortDays[day]; break;
	          case 'A': return Y.date.days[day]; break;
	          case 'b': return Y.date.shortMonths[month]; break;
	          case 'B': return Y.date.months[month]; break;
	          case 'c': return date.toString(); break;
	          case 'd': return pad(date.getDate()); break;
	          case 'H': return pad(hours); break;
	          case 'I': return pad((hours + 12) % 12); break;
	          case 'm': return pad(month + 1); break;
	          case 'M': return pad(minutes); break;
	          case 'p': return hours > 12 ? 'PM' : 'AM'; break;
	          case 'S': return pad(date.getSeconds()); break;
	          case 'w': return day; break;
	          case 'y': return pad(date.getFullYear() % 100); break;
	          case 'Y': return date.getFullYear().toString(); break;
	        }
	      })
	    },
	    distanceOfTimeInWords: function(fromTime, toTime, includeTime) {
		  if (fromTime < toTime){
	      	var delta = parseInt((toTime.getTime() - fromTime.getTime()) / 1000);
			return Y.date.distanceInThePast(fromTime, toTime, delta);
		  }else{
	      	var delta = parseInt((fromTime.getTime() - toTime.getTime()) / 1000);
			return Y.date.distanceInTheFuture(fromTime, toTime, delta);			
		 }
	    },
	
		distanceInThePast: function(fromTime, toTime, delta, includeTime){
	      if (delta < 60) {
	          return 'en menos de un minuto';
	      } else if (delta < 120) {
	          return 'en un minuto más';
	      } else if (delta < (45*60)) {
	          return 'en ' + (parseInt(delta / 60)).toString() + ' minutos mas';
	      } else if (delta < (120*60)) {
	          return 'en una hora más';
	      } else if (delta < (24*60*60)) {
	          return  'en ' + (parseInt(delta / 3600)).toString() + ' horas más';
	      } else if (delta < (48*60*60)) {
	          return 'mañana';
	      } else {
	        var days = (parseInt(delta / 86400)).toString();
	        if (days < 5) {
	          var fmt  = '%B %d, %Y'
	          if (includeTime) fmt += ' %I:%M %p'
	          return Y.date.strftime(fromTime, fmt);
	        } else {
	          return "en " + days + " dias más"
	        }
	      }			
		},
		distanceInTheFuture: function(fromTime, toTime, delta, includeTime){
	      if (delta < 60) {
	          return 'hace menos de un minuto';
	      } else if (delta < 120) {
	          return 'hace u1 minuto ';
	      } else if (delta < (45*60)) {
	          return (parseInt(delta / 60)).toString() + ' minutos atras';
	      } else if (delta < (120*60)) {
	          return 'una hora atras';
	      } else if (delta < (24*60*60)) {
	          return  (parseInt(delta / 3600)).toString() + ' horas atras';
	      } else if (delta < (48*60*60)) {
	          return '1 día atras';
	      } else {
	        var days = (parseInt(delta / 86400)).toString();
	        if (days > 5) {
	          var fmt  = '%B %d, %Y'
	          if (includeTime) fmt += ' %I:%M %p'
	          return Y.date.strftime(fromTime, fmt);
	        } else {
	          return days + " dias atras"
	        }
	      }						
		},
	    timeAgoInWords: function(targetDate, includeTime) {
	      return Y.date.distanceOfTimeInWords(targetDate, new Date(), includeTime);
	    }		
		
	}
}, '0.0.1', {requires: ['node']});