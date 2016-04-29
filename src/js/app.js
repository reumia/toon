'use strict';

class Toonman {

	constructor ( args ) {
		this.config = args.configuration;
		this.navItems = document.querySelectorAll(args.ui.navItem);
		this.cards = document.querySelectorAll(args.ui.card);
		this.layer = document.querySelectorAll(args.ui.layer)[0];
		this.dim = document.querySelectorAll(args.ui.dim)[0];
		this.layerDefaultClass = args.ui.layer.split('.')[1];
		this.dimDefaultClass = args.ui.dim.split('.')[1];
		this.layerItems = this.setLayer();
	}

	init () {
		this.setEvent();
	}

	setEvent () {
		let self = this;
		let i;

		// click NavItem
		for ( i = 0; i < this.navItems.length; i ++ ) {
			this.navItems[i].addEventListener('click', this.clickNavItem.bind(this));
		}
		// click Card
		for ( i = 0; i < this.cards.length; i ++ ) {
			this.cards[i].addEventListener('click', this.clickCard.bind(this));
		}
		// click Layer
		this.layer.addEventListener('click', this.toggleLayerGroup.bind(this));
		// click Dim
		this.dim.addEventListener('click', this.toggleLayerGroup.bind(this));
	}

	clickNavItem (event) {
		let button = event.target;
		let buttonClass = button.className;
		let text = event.target.innerText;
		let i;

		// 클릭된 버튼을 활성화 시킨다.
		for ( i = 0; i < button.parentElement.children.length; i ++ ) {
			let navButton = button.parentElement.children[i];
			navButton.className = buttonClass;
			if ( button === navButton ) {
				button.className = buttonClass + ' active';
			}
		}

		// 클릭된 카테고리의 아이템만 남긴다.
		for ( i = 0; i < this.cards.length; i ++ ) {
			let card = this.cards[i];
			if ( card.dataset.category === text ) {
				card.style.display = "block";
			} else {
				card.style.display = "none";
			}
		}
	}

	clickCard (event) {
		event.preventDefault();
		let dataset = event.target.dataset;
		this.setLayerData(dataset);
		this.toggleLayerGroup();
	}

	setLayer () {
		let layerInfo = document.createElement('div');
		let layerInfoTitle = document.createElement('span');
		let layerInfoDate = document.createElement('span');
		let layerInfoCategory = document.createElement('span');
		let layerImageWrap = document.createElement('div');
		let layerImage = document.createElement('img');

		layerImageWrap.className = this.layer.className + '__image';
		layerInfo.className = this.layer.className + '__info';
		layerInfoTitle.className = 'title';
		layerInfoDate.className = 'date';
		layerInfoCategory.className = 'category';

		layerInfo.appendChild(layerInfoTitle);
		layerInfo.appendChild(layerInfoDate);
		layerInfo.appendChild(layerInfoCategory);
		layerImageWrap.appendChild(layerImage);

		if ( this.layer.children.length > 0 ) this.layer.innerHTML = '';
		this.layer.appendChild(layerInfo);
		this.layer.appendChild(layerImageWrap);

		return {
			layerInfoTitle : layerInfoTitle,
			layerInfoDate : layerInfoDate,
			layerInfoCategory : layerInfoCategory,
			layerImage : layerImage
		}
	}

	setLayerData (data) {
		let dataset = data;
		this.layerItems.layerInfoTitle.innerText = dataset.title;
		this.layerItems.layerInfoDate.innerText = dataset.date;
		this.layerItems.layerInfoCategory.innerText = dataset.category;
		this.layerItems.layerImage.src = dataset.url;
		this.layer.dataset.id = dataset.id;
	}

	toggleLayer () {
		if ( this.layer.className === this.layerDefaultClass ) {
			this.layer.className = this.layer.className + ' active';
		} else {
			this.layer.className = this.layerDefaultClass;
		}
	}
	toggleDim () {
		if ( this.dim.className === this.dimDefaultClass ) {
			this.dim.className = this.dim.className + ' active';
		} else {
			this.dim.className = this.dimDefaultClass;
		}
	}
	toggleLayerGroup () {
		this.toggleLayer();
		this.toggleDim();
		if ( ! /active/g.test(this.layer.className) ) {
			// remove HTML Overflow
			document.getElementsByTagName('html')[0].className = '';
			// set saved Scroll Position
			window.scrollTo(0, this.savedScrollY);
		} else {
			// add layer Height
			this.layer.style.height = window.innerHeight + 'px';
			// save Scroll Position & reset
			this.savedScrollY = window.scrollY;
			window.scrollTo(0, 0);
			this.layer.scrollTop = 0;
			// set HTML Overflow
			document.getElementsByTagName('html')[0].className = 'layer-activated';
		}
	}


}

let options = {
	"ui" : {
		"navItem" : '.nav__item',
		"card" : '.card',
		"layer" : '.layer',
		"dim" : '.dim'
	}
};

let toonman = new Toonman(options);
toonman.init();