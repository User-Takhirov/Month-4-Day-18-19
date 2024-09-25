import { render, category, search } from "./service.js";
const comments = document.querySelector(".comments");
const tab = document.querySelector(".tab");
const btns = document.getElementsByClassName("btns");
const input = document.querySelector(".input");

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
  } else {
    comments.innerHTML = `
    <div class="text-center mx-auto">
    <img class=" mx-auto"  src="./img/no data.png" alt="#" />
    <h1 class=" text-center text-red-600 text-[20px] font-[700]">No Data Found</h1>
    </div>`;
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
