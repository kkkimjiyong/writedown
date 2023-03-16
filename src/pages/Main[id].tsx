import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Footer } from "../global/Footer";
import { Header } from "../global/Header";
import { Layout } from "../global/Layout";
import MainBird from "../assets/MainBird.png";
import styled from "styled-components";
import { supabase } from "../lib/api";

type Tdata = {
  title: string;
  content: string[];
};

export const ShareMain = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [data, setData] = useState<Tdata>();

  const getData = async () => {
    const { data }: any = await supabase
      .from("writedown")
      .select("title,content")
      .eq("id", id);
    setData(data[0]);
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <Layout>
      <StyledTitleBox>{data?.title}</StyledTitleBox>
      <StyledContentBox>{data?.content}</StyledContentBox>
      <StyledButton onClick={() => navigate(`/write/${id}`)}>
        마저 쓰러가기
      </StyledButton>
    </Layout>
  );
};

const StyledTitleBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 90%;
  margin-top: 220px;
  font-size: 24px;
  font-weight: 700;
`;

const StyledContentBox = styled.div`
  margin-top: 30px;
  line-height: 1.6;
  width: 90%;
  font-size: 20px;
  font-weight: 700;
  filter: blur(3px);
`;

const StyledMainImg = styled.img`
  width: 20%;
`;

const StyledButton = styled.button`
  position: absolute;
  bottom: 70px;
  width: 80%;
  height: 50px;
  background-color: gray;
  border: none;
  border-radius: 10px;
  color: white;
  font-weight: 700;
  font-size: 16px;
  :hover {
    cursor: pointer;
  }
`;
