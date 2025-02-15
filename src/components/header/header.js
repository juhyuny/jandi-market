import { gsap } from 'gsap';

//쿠폰 이벤트 배너 닫기
const topBanner = document.querySelector('.top_banner');

const closeBanner = (e) => {
  e.preventDefault();

  const closeButton = e.target.closest('button');

  if (closeButton) {
    topBanner.style.transform = 'translateY(-100%)';
    topBanner.style.transition = 'transform .2s ease-out';
    topBanner.addEventListener('transitionend', () => {
      topBanner.style.display = 'none';
      saveBannerStatus();
    });
  }
};

const saveBannerStatus = () => {
  localStorage.setItem('bannerClosed', 'true');
};

const setBannerOnLoad = () => {
  const bannerClosed = localStorage.getItem('bannerClosed');

  if (bannerClosed === 'true') {
    topBanner.style.display = 'none';
  }
};

topBanner.addEventListener('click', closeBanner);
window.addEventListener('DOMContentLoaded', setBannerOnLoad);

//스크롤 했을 때 헤더 탑 고정
const scroll = document.querySelector('#header_scroll');
const delivery = document.querySelector('#delivery');

window.addEventListener('scroll', () => {
  if (window.scrollY >= 150) {
    scroll.classList.add('top_fixed');
    delivery.style.display = 'none';
  } else if (window.scrollY < 150) {
    scroll.classList.remove('top_fixed');
    delivery.style.display = 'block';
  }
});

//로그인 성공 시, 유저 이름 UI로 구현
const signList = document.querySelector('#sign');
const userId = sessionStorage.getItem('userId');

const bringUserInfo = async () => {
  const users = import.meta.env.VITE_PH_USERS;

  try {
    const response = await fetch(`${users}/${userId}`);
    if (response.ok) {
      const userData = await response.json(); // 데이터를 변수에 저장
      return userData; // Promise를 통해 데이터 반환
    } else {
      return;
    }
  } catch (error) {
    console.error('유저 정보를 가져오는 중에 오류가 발생했습니다.', error);
    // 추가적인 예외 처리
  }
};

//유저리스트에서 로그아웃 클릭 시 세션스토리지 비우기
const logOut = () => {
  const logout = document.querySelector('.logout');
  const handleLogOut = () => {
    sessionStorage.removeItem('userId');
  };
  logout.addEventListener('click', handleLogOut);
};

//로그인했을 때, 유저가 사용 가능한 리스트 보여주기
const showUserInfo = () => {
  const userList = document.querySelector('#user_list');
  const userName = document.querySelector('#user_name');
  userName.addEventListener('mouseover', () => {
    userList.classList.remove('list_hidden');
  });

  userName.addEventListener('mouseout', (e) => {
    const isInside = menuButton.contains(e.currentTarget);
    if (!isInside) {
      userList.classList.add('list_hidden');
    }
  });

  userList.addEventListener('mouseover', () => {
    userList.classList.remove('list_hidden');
  });

  userList.addEventListener('mouseout', (e) => {
    const isInside = menuButton.contains(e.currentTarget);
    if (!isInside) {
      userList.classList.add('list_hidden');
    }
  });
};
// gsap.from('#user_list', { duration: 1, y: '10%', ease: 'power2.inOut' });

// 로그인한 유저 header에 UI 출력
const showUserName = async () => {
  try {
    const userData = await bringUserInfo(); // 데이터 받아온 후에 변수에 할당
    // userData가 있는 경우 조건문 처리
    if (userData) {
      const jandiUser = /*html*/ `
          <li id="user_name" class="">
        <a class="text-sm drop_down" href="/src/pages/login/">${userData.name}님</a>
      </li>
            <li class="line_before">
        <a class="text-sm drop_down" href="#">고객센터</a>
      </li>
      <li
        id="user_list"
        class="list_hidden absolute w-20 bg-white z_index right-24 top-6"
      >
        <ul
          class="flex flex-col gap-1 px-2 py-1 mt-1 font-normal leading-5 border text-13pxr"
        >
          <li class="logout"><a href="/">로그아웃</a></li>
          <li class=""><a href="#">찜한 상품</a></li>
          <li class="withdrawal"><a href="#">탈퇴하기</a></li>
        </ul>
      </li>
    `;
      signList.insertAdjacentHTML('afterbegin', jandiUser);
      showUserInfo();
      logOut();
      // 로그인이 아닌 상태일 때 UI 출력
    } else {
      const nonJandiUser = /*html*/ `
    <li id="register" class="line_after">
        <a class="text-sm" href="/src/pages/register/">회원가입</a>
      </li>
      <li id="login" class="line">
        <a class="text-sm" href="/src/pages/login/">로그인</a>
      </li>
            <li class="line_before">
        <a class="text-sm drop_down" href="#">고객센터</a>
      </li>
    `;
      signList.insertAdjacentHTML('afterbegin', nonJandiUser);
    }
  } catch (error) {
    console.error('데이터 처리 중에 오류가 발생했습니다.', error);
  }
};
showUserName();

const menuBox = document.getElementById('menu_list_box');
const menuButton = document.getElementById('menu_button');
const menuList = document.getElementById('menu_list');
const listItems = document.querySelectorAll('#menu_list > li');
const cartBtn = document.querySelector('.cart');

menuBox.addEventListener('mouseover', () => {
  menuList.classList.remove('list_hidden');
  // listItems.forEach((item, index) => {
  //   gsap.from(item, {
  //     y: -20,
  //     opacity: 0,
  //     duration: 0.2,
  //     delay: index * 0.1,
  //   });
  // });
});

menuBox.addEventListener('mouseout', (e) => {
  const isInside = menuButton.contains(e.currentTarget);
  if (!isInside) {
    menuList.classList.add('list_hidden');
  }
});

cartBtn.addEventListener('click', () => {
  window.location.href = '/src/pages/cart/';
});
