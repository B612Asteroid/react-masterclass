import styled from "styled-components";
import React from "react";
import {Link} from "react-router-dom";
import {useQuery} from "react-query";
import {fetchCoins} from "../api";
import {Helmet} from "react-helmet";
import {useSetRecoilState} from "recoil";
import {isDarkAtom} from "../atoms";

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

const CoinsList = styled.ul`

`;

const Coin = styled.li`
  background-color: ${props => props.theme.cartBgColor};
  color:${props => props.theme.textColor};
  margin-bottom: 10px;
  padding: 20px;
  border-radius: 15px;
  border: 1px solid white;
  a {
    display: flex;
    align-items: center;
    padding: 10px;
    transition: color 0.2s ease-in;
  }
  &:hover {
    a {
      color: ${props => props.theme.accentColor}
    }
  }
`;

const Img = styled.img`
  width: 25px;
  height: 25px;
  margin-right: 10px;
`;

const Loader = styled.span`
  text-align: center;
  display: block;
`


interface ICoin {
    id: string,
    name: string,
    symbol: string,
    rank: number,
    is_new: boolean,
    is_active: boolean,
    type: string
}

interface ICoinsProps {
}

function Coins({}: ICoinsProps) {
    const { isLoading, data } = useQuery<ICoin[]>("allCoins", fetchCoins);
    const setDarkAtom = useSetRecoilState(isDarkAtom);
    const toggleDarkAtom = () => setDarkAtom(prev => !prev);
    return <Container>
        <Helmet>
            <title>Coin</title>
        </Helmet>
        <Header>
            <Title>Coin</Title>
            <button onClick={toggleDarkAtom}>Toggle Mode</button>
        </Header>
        {
            isLoading ? (
                <Loader>loading...</Loader>
            ) : (
                <CoinsList>
                    {data?.slice(0, 100).map(coin => <Coin key={coin.id}>
                        <Link to={{
                         state:{ name: coin.name },
                         pathname: `/${coin.id}`,
                        }}>
                            <Img src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}  alt="img"/>
                            {coin.name} &rarr;
                        </Link>
                    </Coin>)}
                </CoinsList>
            )
        }
    </Container>;
}

export default Coins;