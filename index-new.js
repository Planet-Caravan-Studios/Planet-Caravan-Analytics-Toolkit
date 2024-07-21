/* ============================================================ */
/*
  CUSTOM ANALYTICS EVENTS 
  - Connects to Google Analytics via Google Tag Manager
  - "eventName" variable - MUST match the "Event contains" value in 
    the "Custom GA Event Trigger" trigger in Google Tag Manager. 
    This then triggers the "Custom GA Event Passer" tag that 
    sends the data to Google Analytics as an event.
*/
/* ============================================================ */

//console.log test script file connection
//console.log("===== analytics.js file working!!! =====");

/* ===== ===================== ===== */
/* ===== EVENT PUSHER FUNCTION ===== */
/* ===== ===================== ===== */
  function AnalyticsEvent(eventCat, eventLab, eventAct, eventVal){
    //Set vars - event name & sub-parameters
    const eventName = "GAEvent"; //static, do not update
    eventCat = eventCat || 'no_category'; //gives default/fallback value
    eventLab = eventLab || 'no_label';
    eventAct = eventAct || 'no_action';
    eventVal = eventVal || 'no_value';

    //console log tester
    console.groupCollapsed("===== Custom Analytics Event Triggered =====");
      console.log("Event Name: ["+eventName+"]");
      console.log("Event Category: ["+eventCat+"]");
      console.log("Event Label: ["+eventLab+"]");
      console.log("Event Action: ["+eventAct+"]");
      console.log("Event Value: ["+eventVal+"]");
      console.log("NOTES: To QA events, look under: Google Analytics Container > Realtime > Event Count by Event Name > 'GAEvent' > 'Event Label'.");
    console.groupEnd();

    try {
     //Push event to datalayer
     window.dataLayer = window.dataLayer || [];
     dataLayer.push({
       'event':          eventName,
       'eventCategory':  eventCat,
       'eventAction':    eventAct,
       'eventLabel':     eventLab,
       'eventValue':     eventVal,
     });
     console.log("===== Custom Analytics Event Pushed =====");
    } catch (e) {
     console.log("===== Custom Analytics Event Error =====");
    }
  };

/* ===== ================================ ===== */
/* ===== RUN FUNCTIONS - RUN ON PAGE LOAD ===== */
/* ===== ================================ ===== */

/* ===== ======================================= ===== */
/* ===== RUN FUNCTIONS - EVENT LISTENER TRIGGERS ===== */
/* ===== ======================================= ===== */

  /* ===== General Click Trigger ===== */
    function listenForClickEvents(){
      let clickElements = document.querySelectorAll('[data-analytics-click]');
      clickElements.forEach(element => {
        //apply event listen to all instances
        element.addEventListener('click', function() {
          //grab element's data-attrs, use fallback value if not present.
          let eventCat = element.getAttribute("data-event-category") || "no_event_category";
          let eventLab = element.getAttribute("data-event-category") || "no_event_label";
          let eventAct = "click";
          let eventVal = element.getAttribute("data-event-category") || "no_event_value";
          AnalyticsEvent(eventCat, eventLab, eventAct, eventVal);
        }, false);
      });
    }
    
    
    /* NOTES: ===================================================== */
    /* 
      Example HTML Element: 
        <div 
          data-event="GAEvent" 
          data-category="Home" 
          data-label="CTA" 
          data-action="Click" 
          data-value="undefined"
        >Click Me</div>
    */
    /* ============================================================ */