import React from "react";
import { Container, Card, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import rides from "../../DB/rides";
import "./Rides.css";

const Rides = () => {
  const saveData = (id) =>{
    localStorage.setItem('type', JSON.stringify(id))
  }
  return (
    <div className="rides text-center ">
      <Container>
        <Row>
          {rides.map((r) => (
            <Col md={3} xs={12} key={r.id}>
              <Link to='/destination' onClick={()=> saveData(r.id)}>
              <Card className="p-4" style={{cursor: 'pointer'}}>
                <img
                  src={require(`../../img/${r.img}`).default}
                  alt="rideImg"
                  className="w-75"
                />
                <p className="text-black fw-bold mt-2">{r.name.toUpperCase()}</p>
              </Card>
              </Link>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default Rides;
