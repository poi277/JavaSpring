import { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from '../UI/Header';
export default function UserMyInfomation()
{
    const {uuid} = useParams()

    return(
        <div>
            <Header />
            my info
            {uuid}
        </div>
    )
}