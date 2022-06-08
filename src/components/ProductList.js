import { useQuery } from "react-query";
import { getData, DeleteProduct } from "../api";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Inform from "./images/inform.jpg";

function ProductList() {
  const [single, setSingle] = useState("");
  const [rejectdata, setRejectdata] = useState("");
  const { isLoading, error, data } = useQuery("repoData", getData);
  const [product, setProduct] = useState(data);

  useEffect(() => {
    setProduct(data);
  }, [data]);

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  const View = (id) => {
    let singleData = data.find((item) => {
      return item.id == id;
    });
    setSingle(singleData);
  };
  const  InformReject= (id) => {
    let RejData = data.find((item) => {
      return item.id == id;
    });
    setRejectdata(RejData);
  };

  const Delete = (id) => {
    DeleteProduct(id);
    let products = product.filter((item) => {
      return item.id != id;
    });
    setProduct(products);
  };

  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#Id</th>
            <th scope="col">Title</th>
            <th scope="col">Context</th>
            <th scope="col">Price</th>
            <th scope="col">Picture</th>
            <th scope="col">Status</th>
            <th scope="col">Operation</th>
          </tr>
        </thead>
        <tbody>
          {product &&
            product.map((item, i) => (
              <tr key={i}>
                <td>{i}</td>
                <td>{item.title}</td>
                <td>{item.context}</td>
                <td>{item.price}</td>
                <td>
                  <img src={item.image} width="100px" />
                </td>
                <td>
                  {item.status == 0 && <p>Gozlemededir...</p>}
                  {item.status == 1 && (
                    <p style={{ color: "green" }}>Aktiv olundu</p>
                  )}
                  {item.status == 2 && (
                    <div>
                      <p style={{ color: "red" }}>Legv edildi</p>
                      <img
                        onClick={() => {
                          InformReject(item.id);
                        }}
                        src={Inform}
                        width="40px"
                        data-bs-toggle="modal"
                        data-bs-target="#informModal"
                      />
                    </div>
                  )}
                </td>
                <td>
                  <button
                    onClick={() => {
                      View(item.id);
                    }}
                    className="btn btn-info"
                    type="button"
                    data-bs-toggle="modal"
                    data-bs-target="#staticBackdrop"
                  >
                    View
                  </button>
                  <Link to={`/products/${item.id}`}>
                    <button className="btn btn-warning ms-2">Edit</button>
                  </Link>
                  <button
                    className="btn btn-danger ms-2"
                    onClick={() => {
                      Delete(item.id, i);
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">
                Modal title
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <h3>Title:{single.title} </h3>
              <h5>Price: {single.price} </h5>
              <p>Context: {single.context} </p>
              <img src={single.image} width="100%" alt="" />
            </div>
          </div>
        </div>
      </div>
       {/* InformModal */}
      <div>
        <div
          class="modal fade"
          id="informModal"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">
                  Rejected
                </h5>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div class="modal-body">
                <p style={{color:'red'}}>{rejectdata.about}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductList;
