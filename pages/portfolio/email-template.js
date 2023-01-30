import React from "react";
import { Table, Media } from "reactstrap";
import temp1 from "../../public/assets/images/email-temp/1.jpg";
import pro1 from "../../public/assets/images/email-temp/pro-1.jpg";
import pro2 from "../../public/assets/images/email-temp/pro-2.jpg";
import pro3 from "../../public/assets/images/email-temp/pro-3.jpg";
import cosmetic from "../../public/assets/images/email-temp/cosmetic.jpg";
import temp6 from "../../public/assets/images/email-temp/6.png";
import temp5 from "../../public/assets/images/email-temp/5.png";
import SocialEmailTemplate from "./common/social-email-template";
import MasterItems from "./common/master-items-email-template";
import MasterMenu from "./common/menu-email-template";

const ItemsData = [
  {
    img: pro1.src,
    link: "#",
    about: "When an unknown.",
    price: "$45.00",
  },
  {
    img: pro2.src,
    link: "#",
    about: "When an unknown.",
    price: "$45.00",
  },
  {
    img: pro3.src,
    link: "#",
    about: "When an unknown.",
    price: "$45.00",
  },
];

const BottomImages = [
  { img: temp6.src, link: "#" },
  { img: temp5.src, link: "#" },
];

const EmailTemplate = () => (
  <>
    <Table
      borderless
      className="email-template-table"
      cellPadding="0"
      cellSpacing="0"
    >
      <tbody>
        <tr>
          <td>
            <MasterMenu />
            <Table
              align="center"
              border="0"
              cellPadding="0"
              cellSpacing="0"
            >
              <tbody>
                <tr>
                  <td>
                    <Media src={temp1.src} alt="" style={{ width: "100%" }} />
                  </td>
                </tr>
              </tbody>
            </Table>
            <h4
              style={{
                textAlign: "center",
                margin: "10px",
                color: "#000",
                fontWeight: "700",
              }}
            >
              Additional 50% Off
            </h4>
            <h5
              style={{
                textAlign: "center",
                margin: "0 10px 0 10px",
                color: "#777",
              }}
            >
              On clothes for kids,women & Mens Wear
            </h5>
            <Table
              className="product-box-sec"
              border="0"
              cellPadding="0"
              cellSpacing="0"
              width="100%"
              style={{ marginTop: "20px" }}
            >
              <tbody>
                <tr>
                  {ItemsData.map((data, index) => {
                    return (
                      <MasterItems
                        key={index}
                        img={data.img}
                        link={data.link}
                        about={data.about}
                        price={data.price}
                        widthClass="170px"
                      />
                    );
                  })}
                </tr>
              </tbody>
            </Table>
            <Table
              className="main-bg-light"
              border="0"
              cellPadding="0"
              cellSpacing="0"
              width="100%"
              style={{ marginTop: "40px" }}
            >
              <tbody>
                <tr style={{ textAlign: "center" }}>
                  <td>
                    <a href="#">
                      <Media src={cosmetic.src} style={{ width: "100%" }} />
                    </a>
                  </td>
                </tr>
              </tbody>
            </Table>
            <Table
              className="bottom-product"
              align="center"
              border="0"
              cellPadding="0"
              cellSpacing="0"
              width="100%"
              style={{ marginTop: "30px" }}
            >
              <tbody>
                <tr align="center" className="add-with-banner">
                  {BottomImages.map((data, index) => {
                    return (
                      <td key={index}>
                        <a href={data.link}>
                          <Media src={data.img} />
                        </a>
                      </td>
                    );
                  })}
                </tr>
              </tbody>
            </Table>
            <SocialEmailTemplate marginClass="0 7px" />
          </td>
        </tr>
      </tbody>
    </Table>
    <style global jsx>
      {`
        body {
          text-align: center;
          margin: 20px auto;
          width: 650px;
          font-family: "Open Sans", sans-serif;
          background-color: #e2e2e2;
          display: block;
        }
        .dark .main-logo{
          filter: brightness(0) invert(1);
        }
        .dark .menu li a{
          color: white;
        }
        .dark .email-template-table .headerTable ~ h4{
          color: white !important;
        }
        .dark .email-template-table .footer-social-icon img{
          visibility: visible !important;
          filter: brightness(0) invert(1);
        }
        .headerTable {
          text-align: center;
        }
        .email-template-table {
          background-color: #ffffff;
          box-shadow: 0px 0px 14px -4px rgba(0, 0, 0, 0.2705882353);
          border: 0;
          align: center;
          width: 100%;
        }
        .bottom-product tbody tr td img{
          padding: 0 12px;
        }
        .main-logo {
          width: 180px;
          padding: 10px 20px;
        }

        .menu {
          width: 100%;
          align: right;
          display: inline;
          text-decoration: unset;
        }
        .table td {
          padding: 0;
          text-align: center;
          vertical-align: middle;
        }
        .menu a {
          text-transform: capitalize;
          font-size: 16px;
          margin-right: 15px;
          text-decoration: none;
        }
        .menu li a {
          color: #444;
        }
        .title {
          text-align: center;
          color: #444444;
          font-size: 22px;
          font-weight: bold;
          margin-bottom: 0;
          padding-bottom: 0;
          text-transform: capitalize;
          display: inline-block;
          line-height: 1;
        }
        .header li {
          align: left;
          vertical-align: top;
        }
        .product-box .product {
          /*border:1px solid #ddd;*/
          text-align: center;
          position: relative;
          margin: 0 15px;
        }

        .product-info {
          margin-top: 15px;
        }

        .product-info h6 {
          line-height: 1;
          margin-bottom: 0;
          padding-bottom: 5px;
          font-size: 14px;
          font-family: "Open Sans", sans-serif;
          color: #777;
          margin-top: 0;
        }

        .product-info h4 {
          font-size: 16px;
          color: #444;
          font-weight: 700;
          margin-bottom: 0;
          margin-top: 5px;
          padding-bottom: 5px;
          line-height: 1;
        }

        .main-bg-light {
          background-color: #fafafa;
        }
        .headerTable tr.header td.menu ul{
          float: right;
        }
        @media (max-width: 767px){
          .email-template-table{
            width: 530px;
            margin-left: 15px;
          }
          .product-box-sec tbody tr{
            display: flex;
            justify-content: center;
            flex-flow: wrap;
          }
          .product-box-sec tbody tr td:last-child{
            margin-top: 10px;
          }
          .bottom-product tbody tr{
            display: flex;
            justify-content: center;
            flex-flow: wrap;
          }
          .bottom-product tbody tr td + td{
            margin-top: 10px;
          }
        }
        @media (max-width: 575px){
          .email-template-table{
            width: 436px;
          }
          .headerTable tr{
            display: flex;
            align-items: center;
            flex-flow: wrap;
            justify-content: center;
          }
          .headerTable tr.header td.menu ul{
            float: unset;
          }
          .product-box-sec{
            margin-bottom: 0 !important;
          }
        }
        @media (max-width: 479px){
          .email-template-table{
            width: 316px;
          }
          .product-box-sec tbody tr td{
            width: 100%;
          }
          .footer-social-icon tbody tr{
            flex-flow: wrap;
          }
          .footer-social-icon tbody tr td{
            margin-bottom: 6px !important;
          }
          .product-box-sec .product-box img{
            margin: 0 auto;
          }
          .headerTable tr.header td.menu ul{
            padding: 14px !important;
          }
          .headerTable tr.header td.menu ul li a{
            margin-right: 8px;
          }
          .main-bg-light{
            margin-top: 25px !important;
          }
        }
        @media (max-width: 359px){
          .email-template-table{
            margin-left: 10px;
            width: 280px;
          }
          .product-box-sec .product-box img{
            width: 130px !important;
          }
          .bottom-product tbody tr td img{
            width: 285px;
          }
        }
      `}
    </style>
  </>
);

export default EmailTemplate;
