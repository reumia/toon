'use strict';

class Toonman {

	constructor ( args ) {
		this.ui = args.ui;
		this.config = args.config;
		this.maxNum = this.config.maxNum;
		this.navItems = document.querySelectorAll(this.ui.navItem);
		this.cardWrap = document.querySelectorAll(this.ui.cardWrap)[0];
		this.cards = document.querySelectorAll(this.ui.card);
		this.scrollButton = document.querySelector(this.ui.scrollButton);
		this.layer = document.querySelectorAll(this.ui.layer)[0];
		this.dim = document.querySelectorAll(this.ui.dim)[0];
		this.layerDefaultClass = this.ui.layer.split('.')[1];
		this.dimDefaultClass = this.ui.dim.split('.')[1];
		this.layerItems = this.setLayer();
	}

	init () {
		this.setEvent();
		this.initContents();
		this.setCards(this.cards);
	}

	initContents () {
		this.hideCards();
		this.showScrollButton();
		this.categorizedCards = [];
	}

	setCards ( cardArr ) {
		if ( this.maxNum == 0 || this.maxNum == "" ) {
			console.info("config.json 내의 scroll값이 0이거나 비어있으므로 스크롤이 실행되지 않습니다.");
			for ( let i = 0; i < cardArr.length; i ++ ) {
				let card = cardArr[i];
				card.dataset.visible = "visible";
				this.setImageSource(card);
			}
			this.hideScrollButton();
		} else {
			console.info("스크롤 기능이 실행됩니다.");
			this.setScrolledCards(cardArr);
		}
	}

	hideScrollButton () {
		this.scrollButton.dataset.visible = "hidden";
	}

	showScrollButton () {
		this.scrollButton.dataset.visible = "visible";
	}

	setImageSource ( card ) {
		let source = card.dataset.url;
		let cardInner = card.children[0];
		let thumbnail = cardInner.children[1];
		thumbnail.style.backgroundImage = 'url('+source+')';
	}

	setScrolledCards ( cardArr ) {
		let cardArr = cardArr;
		for ( let i = 0; i < this.maxNum; i ++ ) {
			let card = cardArr[i];
			if ( card != undefined ) {
				card.dataset.visible = "visible";
				this.setImageSource(card);
			} else {
				this.hideScrollButton();
			}
		}
	}

	hideCards () {
		for ( let i = 0; i < this.cards.length; i ++ ) {
			let card = this.cards[i];
			card.dataset.visible = "hidden";
		}
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
		// click ScrollButton
		this.scrollButton.addEventListener('click', this.clickScrollButton.bind(this));
	}

	clickScrollButton (event) {
		event.preventDefault();
		let cardArr = [];
		if ( this.categorizedCards.length <= 0 ) {
			cardArr = document.querySelectorAll('[data-visible=hidden]');
		} else {
			for ( let i = 0; i < this.categorizedCards.length; i ++ ) {
				let card = this.categorizedCards[i];
				if ( card.dataset.visible === "hidden" ) {
					cardArr.push(card);
				}
			}
		}
		this.setScrolledCards(cardArr);
	}

	clickNavItem ( event ) {
		let button = event.target;
		let buttonClass = button.className;
		let text = event.target.innerText;
		let i;

		// buttonClass 초기화
		if ( buttonClass.indexOf('active') != -1 ){
			buttonClass = buttonClass.replace(' active', '');
		}

		// 카드 초기화
		this.initContents();

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
				this.categorizedCards.push(card);
			}
		}
		this.setCards(this.categorizedCards);
	}

	clickCard ( event ) {
		event.preventDefault();
		let dataset = event.currentTarget.dataset;
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

var toonman = new Toonman(options);
toonman.init();