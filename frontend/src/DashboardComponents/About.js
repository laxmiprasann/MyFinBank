import React from "react";
import './Dashboard.css';

const About = () => {
  return (
    <>
      {/* Bank Details Card */}
          <div class="card mb-3">
        <div class="row g-0">
          <div class="col-md-8">
            <div class="card-body">
              <center>
              <h5 class="card-title">About MyFinBank</h5>
              <p class="card-text">
                MyFinBank is a leading financial institution established in January 2000. With headquarters located at 123 Main Street, Cityville, State, Country, MyFinBank offers a wide range of banking services including savings accounts, checking accounts, personal loans, home loans, auto loans, credit cards, investment services, retirement planning, online banking, and a user-friendly mobile banking app.
              </p>
              </center>
            </div>
          </div>
          <div class="col-md-4">
            <img src="https://media.istockphoto.com/id/1487041391/photo/indian-rupee-money-bank-loan.jpg?b=1&s=612x612&w=0&k=20&c=LWBu_9n-UbUGVpHDWxgxUeAxR3LpAMVBnAV8pRRWR40=" class="img-fluid rounded-start" alt="MyFinBank" width="600" height="600" />
          </div>
        </div>
      </div>
      {/* CEO Card */}
      <div class="card mb-3">
        <div class="row g-0">
          <div class="col-md-3">
            <img
              src="https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=600" class="img-fluid rounded-start" alt="CEO" width="600" height="600"/>
          </div>
          <div class="col-md-9">
            <div class="card-body">
              <h5 class="card-title">CEO of MyFinBank</h5>
              <p class="card-text">
                <strong>Name:</strong> Rachel Johnson<br />
                <strong>Age:</strong> 52<br />
                <strong>Education:</strong> MBA in Finance from Harvard Business School<br />
                <strong>Experience:</strong> Rachel has over 25 years of experience in the banking industry. Before joining MyFinBank, she served as the Chief Financial Officer (CFO) of a leading multinational bank for 10 years. Prior to that, she held various executive positions in both regional and national banks.<br />
                <strong>Vision:</strong> Rachel is committed to leading MyFinBank towards becoming a pioneer in digital banking solutions while maintaining a strong focus on customer satisfaction and financial inclusion.<br />
                <strong>Achievements:</strong> Under Rachel's leadership, MyFinBank has seen significant growth in its market share and profitability. She has successfully implemented innovative strategies to streamline operations and enhance the bank's competitiveness in the ever-evolving financial landscape.<br />
                <strong>Community Involvement:</strong> Rachel is actively involved in philanthropic activities, particularly those aimed at promoting financial literacy and supporting underprivileged communities.<br />
                <strong>Interests:</strong> Outside of work, Rachel enjoys hiking, playing tennis, and attending classical music concerts. She is also passionate about art and often visits galleries in her free time.<br />
                </p>
            </div>
          </div>
        </div>
      </div>

    </>
  );
};

export default About;
