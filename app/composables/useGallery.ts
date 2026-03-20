export const useGallery = function(elRef) {
	onMounted(() => {
		const el = elRef.value;
		if (!el) return;

	   const scroller = el.querySelector('.gallery-items');
	   const items = el.querySelectorAll('.gallery-item');
	   const prevBtn = el.querySelector('.gallery-prev');
	   const nextBtn = el.querySelector('.gallery-next');
	   const scrollTolerance = 50;
	   const padding = parseFloat(getComputedStyle(scroller).paddingLeft);

	   prevBtn.addEventListener('click', prevItem);
	   nextBtn.addEventListener('click', nextItem);
	   scroller.addEventListener('scroll', () => { updateControls(scroller.scrollLeft); });

	   updateControls(scroller.scrollLeft);

	   function nextItem() {
	      const current = Array.from(items).reduce((prev, curr) => {
	         return Math.abs(scroller.scrollLeft - prev.offsetLeft) < Math.abs(scroller.scrollLeft - curr.offsetLeft) ? prev : curr;
	      });

	      const nextScrollPos = current?.nextElementSibling?.offsetLeft;

	      if (nextScrollPos) {
	         scroller.scrollTo({ left: nextScrollPos - padding });
	      } else {
	      	scroller.scrollTo({ left: current.offsetLeft + current.offsetWidth})
	      }
	   }

	   function prevItem() {
	      const current = Array.from(items).reduce((prev, curr) => {
	         return Math.abs(scroller.scrollLeft - prev.offsetLeft) < Math.abs(scroller.scrollLeft - curr.offsetLeft) ? prev : curr;
	      });

	     	 if (scroller.scrollLeft > current.offsetLeft) {
	     	 	scroller.scrollTo({ left: current.offsetLeft - padding });
	     	 	return;
	     	 }

	      const prevScrollPos = current?.previousElementSibling?.offsetLeft || 0;

	      if (prevScrollPos !== undefined) {
	         scroller.scrollTo({ left: prevScrollPos - padding });
	      }
	   }

	   function updateControls(scrollPos) {
	      el.classList.remove('start', 'end');

	      if (scrollPos < scrollTolerance) {
	         el.classList.add('start');
	      }

	      if (scrollPos >= scroller.scrollWidth - scroller.offsetWidth - scrollTolerance) {
	         el.classList.add('end');
	      }
	   }

   });
}