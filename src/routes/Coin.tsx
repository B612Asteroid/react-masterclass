import React, {useState} from "react";
import {useLocation, useParams} from "react-router-dom";
import styled from "styled-components";

const Title = styled.h1`
  font-size: 48px;
  color: ${props => props.theme.accentColor}
`;

const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Loader = styled.span`
  text-align: center;
  display: block;
`
interface RouteParams {
    coinId: string;
}
interface RouteState {
    name:string;
}
function Coin() {
    const { coinId } = useParams<RouteParams>();
    const [loading, setLoading] = useState(true);
    const { state } = useLocation<RouteState>();

    return <Container>
        <Header>
            <Title>{state ? state.name : "Loading..."}</Title>
        </Header>
        {
            loading ? (
                <Loader>loading...</Loader>
            ) : null
        }
    </Container>
}

export default Coin;