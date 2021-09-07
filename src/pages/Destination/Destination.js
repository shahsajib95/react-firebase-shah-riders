import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import Map from "../../component/Map/Map";
import rides from "../../DB/rides";
import { BsPeopleFill } from "react-icons/bs";
import "./Destination.css";
import { GiDirectionSigns } from "react-icons/gi";

const Destination = () => {
  const [mapData, setMapData] = useState({ origin: "", destination: "" });
  const [toggle, setToggle] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    setMapData({ origin: data.origin, destination: data.destination });
    setToggle(true);
  };

  const [riderData, setRidreData] = useState([]);
  const id = JSON.parse(localStorage.getItem("type"));
  useEffect(() => {
    const ride = rides.find((r) => r.id === id);
    setRidreData(ride);
  }, [id]);
  console.log(riderData);
  return (
    <div>
      <Container>
        <hr></hr>
        <div className="destination">
          <Row>
            <Col md={4} sm={12}>
              {!toggle ? (
                <Card className="p-3" bg="light">
                  <Form onSubmit={handleSubmit(onSubmit)}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label className="fw-bold text-muted">
                        Pick From
                      </Form.Label>
                      <Form.Control
                        type="text"
                        {...register("origin", { required: true })}
                      />
                      {errors.origin && <span>This field is required</span>}
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label className="fw-bold text-muted">
                        Pick To
                      </Form.Label>
                      <Form.Control
                        type="text"
                        {...register("destination", { required: true })}
                      />
                      {errors.destination && (
                        <span>This field is required</span>
                      )}
                    </Form.Group>
                    <Button className="w-100 orange-btn" type="submit">
                      Search
                    </Button>
                  </Form>
                </Card>
              ) : (
                <Card className="desDetails p-2" bg="light">
                  <Card className="orange-bg rounded text-white text-capitalize m-2 p-3 ">
                    <div className="d-flex justify-content-around align-items-center">
                      <p>{mapData.origin}</p>
                      <p>
                        <GiDirectionSigns
                          className="text-white"
                          style={{ fontSize: "2rem" }}
                        />
                      </p>
                      <p>{mapData.destination}</p>
                    </div>
                  </Card>
                  {riderData.availabe?.map((r) => (
                    <Card className="m-2 p-3">
                      <div className="d-flex justify-content-around align-items-center">
                        <img
                          src={require(`../../img/${riderData.img}`).default}
                          alt="rideImg"
                          className="w-25"
                        />
                        <p className="fw-bold">{riderData.name}</p>
                        <p className="fw-bold">
                          <BsPeopleFill className="text-muted" /> {r.sit}
                        </p>
                        <p className="fw-bold"> ${r.rate}</p>
                      </div>
                    </Card>
                  ))}
                </Card>
              )}
            </Col>
            <Col md={8} sm={12}>
              <Map origin={mapData.origin} destination={mapData.destination} />
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
};

export default Destination;
