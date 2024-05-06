import React from "react";
import './Dashboard.css';

const Home = () => {
  return (
    <>
      <h1 className="title">Welcome to MyFinBank! Have a Safe Banking:)</h1>
    <div id="carouselExampleInterval" class="carousel slide" data-bs-ride="carousel">
    <div class="carousel-inner">
    <div class="carousel-item active" data-bs-interval="10000">
      <img src="https://images.pexels.com/photos/1422408/pexels-photo-1422408.jpeg?auto=compress&cs=tinysrgb&w=600" class="d-block w-100" alt="..." width={200} height={500}/>
    </div>
    <div class="carousel-item" data-bs-interval="2000">
      <img src="https://images.pexels.com/photos/1602726/pexels-photo-1602726.jpeg?auto=compress&cs=tinysrgb&w=600" class="d-block w-100" alt="..." width={200} height={500}/>
    </div>
    <div class="carousel-item">
      <img src="https://images.pexels.com/photos/2988232/pexels-photo-2988232.jpeg?auto=compress&cs=tinysrgb&w=600" class="d-block w-100" alt="..." width={250} height={500}/>
    </div>
    <div class="carousel-item">
      <img src="https://images.pexels.com/photos/5999936/pexels-photo-5999936.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" class="d-block w-100" alt="..." width={250} height={500}/>
    </div>
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>
    </>
  )
};

export default Home;
