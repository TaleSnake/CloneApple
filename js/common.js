import ipads from "../data/ipads.js";
import navigations from "../data/navigations.js";




//  장바구니
const basketBtnEl = document.querySelector('header .basket-starter')
const basketEl = document.querySelector('header .basket')
basketBtnEl.addEventListener('click', function (event) {
    event.stopPropagation()
    if(basketEl.classList.contains('show')) {
        hideBasket()
    }else {
        showBasket()
    }
})
basketEl.addEventListener('click', function (event) {
    event.stopPropagation()
})

window.addEventListener('click', function (){
    hideBasket()
})

function showBasket() {
    basketEl.classList.add('show')
}
function hideBasket() {
    basketEl.classList.remove('show')
}


// 검색
const headerEl = document.querySelector('header')
const searchWrapEl = headerEl.querySelector('.search-wrap')
const searchBtnEl = headerEl.querySelector('.search-starter')
const searchCloseEl = searchWrapEl.querySelector('.search-close')
const searchInputEl = searchWrapEl.querySelector('input')
const shadowEl = searchWrapEl.querySelector('.shadow')
searchBtnEl.addEventListener('click', showSearch)
searchCloseEl.addEventListener('click', hideSearch)
shadowEl.addEventListener('click', hideSearch)

// 검색 에니메이션
const headerMenuEls = [...headerEl.querySelectorAll('ul.menu > li')] //전개 연산자를 이용한 얕은 복사
const autoCompleteMenUEls = [...searchWrapEl.querySelectorAll('.auto-complete li')]
// const headerMenuEls2 = headerEl.querySelectorAll('ul.menu > li') //reserve() 사용불가

function showSearch() {
    headerEl.classList.add('searching')
    document.documentElement.classList.add('fixed')
    headerMenuEls.reverse().forEach(function (menuEl, index) {
        menuEl.style.transitionDelay = index * .4 / headerMenuEls.length + 's'
    })
    autoCompleteMenUEls.forEach(function (menuEl, index) {
        menuEl.style.transitionDelay = index * .4 / headerMenuEls.length + 's'
    })
    setTimeout(function () {
        // 에니메이션 처리가 완료된 후 포커스 처리 해야 함
        searchInputEl.focus()
    }, 600)
}
function hideSearch() {
    searchInputEl.value = ''

    headerEl.classList.remove('searching')
    document.documentElement.classList.remove('fixed')
    headerMenuEls.forEach(function (menuEl, index) {
        menuEl.style.transitionDelay = index * .4 / headerMenuEls.length + 's'
    })
    autoCompleteMenUEls.reverse().forEach(function (menuEl, index) {
        menuEl.style.transitionDelay = index * .4 / headerMenuEls.length + 's'
    })
    // 다시 정배열로 되돌려줘야 한다..
    autoCompleteMenUEls.reverse()
}


// IntersectionObserver  화면에 보여지는지 옵져빙
const io = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
        // 보여지는 intersecting 이 변경되면 호출
        if(entry.isIntersecting){
            entry.target.classList.add('show')
        }else {
            entry.target.classList.remove('show')
        }
    })
})

// 옵져빙할 요소에 옵져버 등록
const infoEls = document.querySelectorAll('.info')
infoEls.forEach(function(el) {
    io.observe(el)
})


// Stage 색션 비디오 재생
const videoPlayEl = document.querySelector('.controller--play')
const videoPauseEl = document.querySelector('.controller--pause')
const videoEl = document.querySelector('.stage video')
videoPlayEl.addEventListener('click', function () {
    videoPlayEl.classList.add('hide')
    videoPauseEl.classList.remove('hide')

    videoEl.play()

})
videoPauseEl.addEventListener('click', function () {
    videoPlayEl.classList.remove('hide')
    videoPauseEl.classList.add('hide')

    videoEl.pause()
})



// Compare 랜더링
const itemsEl = document.querySelector('.compare .items')
ipads.forEach(function (ipad) {

    let colorList = ''
    ipad.colors.forEach(function (color){
        colorList += `
         <div class="color" style="background-color: ${color}"></div>
        `
    })

    const itemEl = document.createElement('div')
    itemEl.classList.add('item')
    itemEl.innerHTML = `
    <img class="thumbnail" src="${ipad.thumbnail}" alt="iPad Pro">
    <div class="colors">
        ${colorList}
    </div>
    <h2>${ipad.name}</h2>
    <p>${ipad.tagline}</p>
    <p class="price">₩${ipad.price}부터</p>
    <a href="javascript:void(0)" class="btn">구입하기</a>
    <a href="${ipad.url}" class="link">더 알아보기</a>
    `
    itemsEl.append(itemEl)

})

const navigationsEl = document.querySelector('footer .navigations')
navigations.forEach(function (nav) {
    let navList = ''

    nav.maps.forEach(function (map) {
        navList += `
        <a href="${map.url}">${map.name}<a/>
        `
    })

    const itemEl = document.createElement('div')
    itemEl.classList.add('item')
    itemEl.innerHTML = `
    <h2>${nav.title}</h2>
    <ul class="maps">${navList}</ul>
    `

    navigationsEl.append(itemEl)
})

function appendElement(tagName, parent, className='') {
    const element = document.createElement(tagName)
    if(className.length > 0) {
        element.classList.add(className)
    }
    return element
}

const yearEl = document.querySelector('span.year')
yearEl.textContent = new Date().getFullYear()