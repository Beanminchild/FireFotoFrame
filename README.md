# Fire-Foto-Frame
website that drives End parents Fire Foto Frame

<script>
  setTimeout(() => {
    const s = document.createElement('script');
    s.src = 'main.js';
    document.head.appendChild(s);
  }, 40000);
</script>




<script>
  setTimeout(()=>{const s=document.createElement("script");s.src="main.js";document.head.appendChild(s);},40000);(function(){'use strict';const t="View80",p="Slideshow Paused",sT="Slideshow Started";function e(){return document.getElementById(t)}function n(o){if(!o) return;if(o.dataset.originalText===undefined)o.dataset.originalText=o.textContent||"";o.textContent=sT}function r(o){if(!o) return;const c=(o.textContent||"").trim();if(c===sT&&o.dataset.originalText!==undefined)o.textContent=o.dataset.originalText;else if(c===sT)o.textContent=p}function i(o){if(!o) return;n(o)}function u(o){if(!o) return;r(o)}function a(){let c=e();if(c) i(c);const m=new MutationObserver(()=>{const o=e();if(o&&o!==c){if(c)u(c);c=o;i(c)}else if(!o&&c){u(c);c=null}});m.observe(document.documentElement||document.body,{childList:!0,subtree:!0});window.addEventListener("beforeunload",()=>{m.disconnect();if(c)u(c)})}if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",a);else a();})();

  </script>
