"use client";
import PersonIcon from '@mui/icons-material/Person';
import { useState } from "react";
import Image from "next/image";
import Button from '@mui/material/Button';
import EmailIcon from '@mui/icons-material/Email';
import CheckIcon from '@mui/icons-material/Check';
import { iCardPerfil } from '../../components/CardPerfil/iCardPerfil';

export const CardPerfil = (props: iCardPerfil) =>{
  const [btnSeguirStatus,setBtnSeguirStatus] = useState(false);


  return(
    <div className="w-full max-w-xs bg-white rounded-3xl flex flex-col items-center gap-5 relative p-6 sm:p-10">
      <div className='w-full bg-gray-200 rounded-t-3xl z-0 absolute top-0 z-0 h-24 sm:h-28'></div>
      <div className="flex flex-col gap-2 items-center text-center font-sans z-10">
        <div className='relative w-24 h-24 rounded-full overflow-hidden outline-4 outline-offset-2 outline-purple-500'>
          <Image
            src={props.foto}
            alt="Foto do perfil"
            fill
            className="object-cover"
          />
        </div>
         
        <h2 className="font-bold text-lg">
          {props.nome}
        </h2>

        <p className="font-light text-gray-600 text-xs">
          {props.cargo}
        </p>
      </div>

      <div>
        <ul className="flex flex-row gap-4 font-sans">
          <li className="flex flex-col items-center text-center">
            <span className="font-bold">{props.seguidores}</span>
            <span className="font-light text-gray-400 text-[10px]">Seguidores</span>
          </li>

          <li className="flex flex-col items-center text-center">
            <span className="font-bold">{props.seguindo}</span>
            <span className="font-light text-gray-400 text-[10px]">Seguindo</span>
          </li>

          <li className="flex flex-col items-center text-center">
            <span className="font-bold">{props.qtdProjetos}</span>
            <span className="font-light text-gray-400 text-[10px]">Projetos</span>
          </li>
        </ul>
      </div>

      <div className="flex flex-col sm:flex-row gap-2">
        <Button
          onClick={() => setBtnSeguirStatus(!btnSeguirStatus)}
          className='bg-cyan-500 shadow-lg shadow-cyan-500/40'
          startIcon={btnSeguirStatus ? <CheckIcon /> : <PersonIcon />}
          sx={{
          width: 120,
          height: 40,
          background: btnSeguirStatus ? "#10B981" : "linear-gradient(90deg, #8a5cf1, #5d9df8)",
          color: "#fff",
          borderRadius: "12px",
          padding: "6px 20px",
          textTransform: "none",
          fontSize: "10px",
          "&:hover": {
            background: btnSeguirStatus ? "" : "linear-gradient(90deg, #7a52d8, #548edb)",
            }
        }}>
          {btnSeguirStatus ? "Seguindo" : "Seguir"}
        </Button>
        <Button
          startIcon={<EmailIcon/>}
          sx={{
            width: 120,
            height: 40,
            background:"#F3F4F6",
            color: "#030303ff",
            borderRadius: "12px",
            padding: "6px 20px",
            textTransform: "none",
            fontSize: "10px",
            border: "1px solid #dbdadaff",
            "&:hover": {
              background: "#dbdadaff",
            }
          }}>
          Mensagem
        </Button>
      </div>

      <p className="font-light text-gray-600 text-[10px] text-center break-words">
          {props.texto}
      </p>

    </div>
  );
}