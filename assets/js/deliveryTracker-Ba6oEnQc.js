import"./main-Ckyfot9f.js";const p=document.querySelector("[data-delivery-tracker-list]");class h{constructor(e,t,s){this.customerName=e,this.address=t,this.distance=s}get distanceWithUnit(){return`${this.distance} км`}get deliveryClass(){return this.distance<=3?"delivery-card--short":this.distance<=8?"delivery-card--medium":"delivery-card--long"}createCard(e){return`
    <li class="delivery-card ${this.deliveryClass}" data-index="${e}">
      <div class="delivery-card__header">
        <h3 class="delivery-card__customer">${this.customerName}</h3>
        <span class="delivery-card__distance">${this.distanceWithUnit}</span>
      </div>
      <div class="delivery-card__body">
        <p class="delivery-card__address">📍 ${this.address}</p>
      </div>
      <div class="delivery-card__footer">
        <button class="delivery-card__action delivery-card__action--edit">Изменить</button>
        <button class="delivery-card__action">Принято в доставку</button>
      </div>
    </li>
    `}}class n extends h{constructor(e,t,s,a="delivery"){super(e,t,s),this.status=a}static getTotalDistance(e,t="canceled"){return e.filter(s=>s.status!==t).reduce((s,a)=>s+a.distance,0)}get deliveryClass(){const e=super.deliveryClass;return this.status==="delivered"?`${e} delivery-card--delivered`:this.status==="canceled"?`${e} delivery-card--canceled`:`${e} delivery-card--delivery`}openEditModal(){const e=document.querySelector(".modal-overlay");e&&e.remove();const t=`
    <div class="modal-overlay">
      <div class="modal">
        <div class="modal__header">
          <h2 class="modal__title">✏️ Редактировать доставку</h2>
          <button class="modal__close">&times;</button>
        </div>
        
        <form class="modal__form" id="editForm">
          <div class="form-group">
            <label class="form-label" for="customerName">Имя покупателя</label>
            <input 
              type="text" 
              id="customerName" 
              name="customerName" 
              class="form-input"
              value="${this.customerName}"
              required
            >
          </div>
          
          <div class="form-group">
            <label class="form-label" for="address">Адрес доставки</label>
            <input 
              type="text" 
              id="address" 
              name="address" 
              class="form-input"
              value="${this.address}"
              required
            >
          </div>
          
          <div class="form-group">
            <label class="form-label" for="distance">Расстояние (км)</label>
            <input 
              type="number" 
              id="distance" 
              name="distance" 
              class="form-input"
              min="1"
              max="100"
              value="${this.distance}"
              required
            >
          </div>
          
          <div class="form-group">
            <label class="form-label" for="status">Статус доставки</label>
            <select id="status" name="status" class="form-select">
              <option value="delivery" ${this.status==="delivery"?"selected":""}>🚚 Доставляется</option>
              <option value="delivered" ${this.status==="delivered"?"selected":""}>✅ Доставлен</option>
              <option value="canceled" ${this.status==="canceled"?"selected":""}>❌ Отменён</option>
            </select>
          </div>
          
          <div class="modal__footer">
            <button type="button" class="btn btn--secondary modal__cancel">Отмена</button>
            <button type="submit" class="btn btn--primary modal__save">Сохранить изменения</button>
          </div>
        </form>
      </div>
    </div>
  `.trim(),a=document.createRange().createContextualFragment(t),c=a.firstElementChild;document.body.appendChild(a),this.setupModalEvents(c)}setupModalEvents(e){const t=e.querySelector(".modal__close"),s=e.querySelector(".modal__cancel"),a=e,c=()=>{e.remove()};t.addEventListener("click",c),s.addEventListener("click",c),a.addEventListener("click",u=>{u.target===a&&c()});const v=e.querySelector("#editForm");v.addEventListener("submit",u=>{u.preventDefault();const f=new FormData(v),l=Object.fromEntries(f);console.log("data",l),this.customerName=l.customerName,this.address=l.address,this.distance=Number(l.distance),this.status=l.status;const o=i.findIndex(y=>y===this),m=document.querySelector(`[data-index='${o}']`);m&&(m.outerHTML=this.createCard(o),document.querySelector(`[data-index='${o}']`).querySelector(".delivery-card__action--edit").addEventListener("click",()=>{i[o].openEditModal()})),c()})}}const i=[new n("Ольга","ул. Вымыслов, д. 12",8,"delivered"),new n("Дмитрий","ул. Задачная, д. 7",5,"canceled"),new n("Оля","ул. Ткачей, д. 43",10)],_=i.map((d,e)=>d.createCard(e)).join("");p.innerHTML=_;const b=p.querySelectorAll(".delivery-card__action--edit");b.forEach((d,e)=>{d.addEventListener("click",()=>{i[e].openEditModal()})});const g=document.querySelector("[data-delivery-count]");g.textContent=i.length;const C=document.querySelector("[data-total-distance-btn]"),r=document.querySelector("[data-total-distance]"),$=document.querySelector("[data-total-count]");C.addEventListener("click",()=>{const d=n.getTotalDistance(i),e=i.filter(t=>t.status!=="canceled");r.classList.remove("updated"),r.offsetWidth,r.classList.add("updated"),d===0?(r.textContent="0 км",r.style.color="#64748b"):(r.textContent=`${d} км`,r.style.color=""),$.textContent=`Активных доставок: ${e.length}`,setTimeout(()=>{r.classList.remove("updated")},800)});
