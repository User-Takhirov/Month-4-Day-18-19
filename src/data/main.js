import { render, category, search } from "./service.js";
const comments = document.querySelector(".comments");
const tab = document.querySelector(".tab");
const btns = document.getElementsByClassName("btns");
const input = document.querySelector(".input");
const counter = document.querySelector(".counter");
const modalBtn = document.querySelector(".modal_btn");
const modalItems = document.querySelector(".modal_items");
const Modalbg = document.querySelector(".modal_bg");
const closeBtn = document.querySelector(".close_btn");


const tabrender = async () => {
  const data = await category();
  tab.innerHTML = data
    ?.map(
      (item) => `
    <li><a class="btns rounded-[10px] py-[6px] px-[16px] text-[#4661e6] font-[600] text-[13px] bg-[#f2f4ff]" href="#" data-id="${item}">${item}</a></li>
    `
    )
    .join("");
  btns[0].style.color = "white";
  btns[0].style.background = "#4661E6";
};

tabrender();

const renderall = async (item) => {
  const data = await render(item);
  comments.innerHTML = data
    .map(
      (item) => `

      <div class="bg-white mb-[20px] flex gap-[40px] rounded-[10px] pl-[32px]  py-[28px]">
      <div >
      <div class="pt-[14px] px-[9px] pb-[8px] bg-[#f2f4fe] rounded-[10px] mt-[28px] text-center ">
      <img class="text-center mx-auto mb-[8px]" src="./img/up.svg" alt="#" />
      <p class="font-[700] text-[13px] text-[#3a4374]">${item.votes}</p>
      </div>
      </div>
      <div>
      <h2 class="font-[700] text-[18px] text-[#3a4374] mb-[4px] ">${item.title}</h2>
      <p class="font-[400] text-[16px] text-[#647196] mb-[12px]">${item.description}</p>
      <a href="#"  class="font-[600] text-[13px] text-[#4661e6] py-[6px] px-[16px] bg-[#f2f4ff] rounded-[10px]">${item.type}</a>
      </div>
      </div>
  `
    )
    .join("");
  counter.textContent = `${data.length}`;
};
renderall();

tab.addEventListener("click", (e) => {
  const item = e.target.dataset.id;
  if (item) {
    renderall(item);
    for (let i of btns) {
      i.style.color = "";
      i.style.background = "";
    }
    e.target.style.color = "white";
    e.target.style.background = "#4661E6";
  }
});

const inputRender = async (value) => {
  const data = await search(value);
  if (typeof data == "object") {
    comments.innerHTML = data
      ?.map(
        (item) => `
   <div class="bg-white mb-[20px] flex gap-[40px] rounded-[10px] pl-[32px]  py-[28px]">
      <div >
      <div class="pt-[14px] px-[9px] pb-[8px] bg-[#f2f4fe] rounded-[10px] mt-[28px] text-center ">
      <img class="text-center mx-auto mb-[8px]" src="./img/up.svg" alt="#" />
      <p class="font-[700] text-[13px] text-[#3a4374]">${item.votes}</p>
      </div>
      </div>
      <div>
      <h2 class="font-[700] text-[18px] text-[#3a4374] mb-[4px] ">${item.title}</h2>
      <p class="font-[400] text-[16px] text-[#647196] mb-[12px]">${item.description}</p>
      <a href="#"  class="font-[600] text-[13px] text-[#4661e6] py-[6px] px-[16px] bg-[#f2f4ff] rounded-[10px]">${item.type}</a>
      </div>
      </div>
  `
      )
      .join("");
    counter.textContent = `${data.length}`;
  } else {
    comments.innerHTML = `
    <div class="w-[100%] h-[600px] bg-white mb-[24px] rounded-[10px]">
    <div class="text-center mx-auto pt-[111px] ">
    <img class=" mx-auto mb-[53px]"  src="./img/Search.png" alt="#" />
    <h1 class=" text-center text-[#3a4374] text-[24px] font-[700] mb-[16px]">There is no such kind of feedback yet.</h1>
    <p class="font-[400] text-[16px] text-center text-[#647196] w-[421px] mx-auto">Got a suggestion? Found a bug that needs to be squashed? We love hearing about new ideas to improve our app.</p>
    </div>
    </div>
    `;
  }
  if (!data) {
    counter.textContent = `0`;
  }
};

const useDebounce = () => {
  let id;
  return () => {
    comments.innerHTML = `<h1 class=" font-[700] text-blue-500 text-center text-[20px]">Searching....</h1>
      `;
    clearTimeout(id);
    id = setTimeout(() => {
      inputRender(input.value);
    }, 500);
  };
};

const debounce = useDebounce();

input.addEventListener("keyup", (event) => {
  if (event.key == "Enter") {
    debounce();
  }
});

const OpenModal = () => {
  modalItems.innerHTML = `
  <div class="">
  <img class="btn_img" src="./img/add_btn.svg" alt="#" />
  <form>
  <h1 class="font-[700] text-[24px] text-[#3a4374]  mb-[40px]">Create New Feedback</h1>
  <div class="mb-[24px]">
  <h3 class="font-[700] text-[14px] text-[#3a4374] mb-[2px]">Feedback Title</h3>
  <p class="font-[400] text-[14px] text-[#647196] mb-[16px]">Add a short, descriptive headline</p>
  <input type="text" class="w-[100%] h-[48px] bg-[#F7F8FD] pl-[20px] pr-[30px]" />
  </div>
    <div class="mb-[24px]">
  <h3 class="font-[700] text-[14px] text-[#3a4374] mb-[2px]">Category</h3>
  <p class="font-[400] text-[14px] text-[#647196] mb-[16px]">Choose a category for your feedback</p>
 <select class="w-[100%] h-[48px] font-[400] text-[#3a4374] text-[15px] bg-[#F7F8FD]">
 <option>Features</option>
 <option>Enhancements</option>
 <option>Bugs</option>
 </select>
  </div>
    <div class="mb-[32px]">
  <h3 class="font-[700] text-[14px] text-[#3a4374] mb-[2px]">Feedback Detail</h3>
  <p class="font-[400] text-[13px] text-[#647196] mb-[16px]">Include any specific comments on what should be improved, added, etc.</p>
  <input type="text" class="w-[100%] h-[96px] bg-[#F7F8FD]  pl-[20px] pr-[30px]" />
  </div>
  <div class="flex justify-end gap-[16px]">
  <button class="font-[700] text-[14px] text-[#f2f4fe] bg-[#3a4374] rounded-[10px] py-[12px] px-[24px]">Cancel</button>
  <button class="font-[700] text-[14px] text-[#f2f4fe] bg-[#ad1fea] rounded-[10px] py-[12px] px-[25px]">Add Feedback</button>
  </div>
  
  </form>


  </div>
  `;
};
OpenModal();

modalBtn.addEventListener("click", () => {
  modalItems.style.display = "block";
  Modalbg.style.display = "block";
  closeBtn.style.display = "block";
});

closeBtn.addEventListener("click", () => {
  modalItems.style.display = "none";
  Modalbg.style.display = "none";
  closeBtn.style.display = "none";
});
