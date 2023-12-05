const el = document.querySelector("accordion-item");
el.addEventListener("click", displayContent());

function displayContent() {
  let answer = document.querySelector(".answer");
  return answer.classList.toggle("show");
}
