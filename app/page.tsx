"use client";
import {  Box, Button,FormControl, Stack, TextField } from '@mui/material';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import { useRouter } from "next/navigation";
import {  useState } from 'react';
import alertaMensagem from '@/utils/alertaMensagem';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';


const PaginaInicial = () =>{
  const [nome, setNome] = useState<string>('');
  const [seguidores, setSeguidores] = useState<number>(0);
  const [seguindo, setSeguindo] = useState<number>(0);
  const [texto, setTexto] = useState<string>('');
  const [cargo, setCargo] = useState<string>('');
  const [qtdProjetos, setQtdProjetos] = useState<number>(0);
  const [foto, setFoto] = useState<File | null>(null);

  const [erroNome, setErroNome] = useState<boolean>(false);
  const [erroSeguidores, setErroSeguidores] = useState<boolean>(false);
  const [erroSeguindo, setErroSeguindo] = useState<boolean>(false);
  const [erroTexto, setErroTexto] = useState<boolean>(false);
  const [erroCargo, setErroCargo] = useState<boolean>(false);
  const [erroProjetos, setErroProjetos] = useState<boolean>(false);
  const [erroFoto, setErroFoto] = useState<boolean>(true);

  const [alerta, setAlerta] = useState<React.ReactNode | null>(null);

  const router = useRouter();

  setTimeout(()=>{
    if(alerta){
      setAlerta(null);
    }
  }, 3000)

  const verificarNome = () =>{
    if(!nome){
      setErroNome(true);
    }else{
      setErroNome(false)
    }
  }

  const verificarSeguidores = () =>{
    if(!seguidores || seguidores <= 0){
      setErroSeguidores(true);
    }else{
      setErroSeguidores(false);
    }
  }

  const verificarSeguindo = () =>{
    if(!seguindo || seguindo <= 0){
      setErroSeguindo(true);
    }else{
      setErroSeguindo(false);
    }
  }

  const verificarCargo = () =>{
    if(!cargo){
      setErroCargo(true);
    }else{
      setErroCargo(false);
    }
  }

  const verificarProjeto = () =>{
    if(!qtdProjetos || qtdProjetos <= 0){
      setErroProjetos(true);
    }else{
      setErroProjetos(false);
    }
  }

  
  const verificarTexto = () => {
    if (texto.trim() === '') {
      setErroTexto(true);
    } else {
      setErroTexto(false);
    }
  };

  const importarFoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const imagem = e.target.files?.[0];

    if(!imagem || !imagem.type.startsWith('image/')){
      setAlerta(alertaMensagem('Importe somente imagem', 'error', <ReportProblemIcon/>));
      setErroFoto(true);
      setFoto(null);
      return
    }

    setFoto(imagem);
    setErroFoto(false);
    
  }

  const gerarCard = () => {

    if(!nome || !texto || !cargo || !seguidores || !seguidores || !qtdProjetos){
      setAlerta(alertaMensagem('Preencha todos os campos', 'error', <ReportProblemIcon/>));
      return;
    }

    const urldaImagem = foto ? URL.createObjectURL(foto) : '';
    const url = `/card?nome=${nome}&cargo=${cargo}&seguidores=${seguidores}&seguindo=${seguindo}&qtdProjetos=${qtdProjetos}&texto=${texto}&foto=${encodeURIComponent(urldaImagem)}`
    
    router.replace(url);
}

  return (
    <div className="flex min-h-screen items-center justify-center font-sans bg-[#9A67BD]">
      <FormControl className="w-full max-w-md">
        <div className="bg-white p-4 sm:p-8 rounded-lg">
          <Stack direction="column" spacing={1}>
            <TextField label="Nome" value={nome} onBlur={verificarNome} onChange={(e) => setNome(e.target.value)} error={erroNome} helperText={erroNome ? "Preencha o campo" : ""} slotProps={{formHelperText: { sx: {fontSize: '0.65rem',margin: '0'},},}} required></TextField>

            <div className="flex flex-col sm:flex-row gap-2">
              <TextField type='number' value={seguidores} onBlur={verificarSeguidores} onChange={(e) => setSeguidores(Number(e.target.value))} label="Seguidores" error={erroSeguidores} helperText={erroSeguidores ? "Preencha o campo corretamente" : ""} slotProps={{formHelperText: { sx: {fontSize: '0.65rem',margin: '0'},},}} required></TextField>
              <TextField type='number' value={seguindo} onBlur={verificarSeguindo} onChange={(e) => setSeguindo(Number(e.target.value))} label="Seguindo" error={erroSeguindo} helperText={erroSeguindo ? "Preencha o campo corretamente" : ""} slotProps={{formHelperText: { sx: {fontSize: '0.65rem',margin: '0'},},}} required></TextField>
            </div>

            <div className="flex flex-col sm:flex-row gap-2">
              <TextField label="Cargo" value={cargo} onBlur={verificarCargo} onChange={(e) => setCargo(e.target.value)} error={erroCargo} helperText={erroCargo ? "Preencha o campo" : ""} slotProps={{formHelperText: { sx: {fontSize: '0.65rem',margin: '0'},},}} required></TextField>
              <TextField type='number' value={qtdProjetos} onBlur={verificarProjeto} onChange={(e) => setQtdProjetos(Number(e.target.value))}  label="Projetos" error={erroProjetos} helperText={erroProjetos ? "Preencha o campo corretamente" : ""} slotProps={{formHelperText: { sx: {fontSize: '0.65rem',margin: '0'},},}} required></TextField>
            </div>  

            <TextareaAutosize 
              aria-label="minimum height"
              minRows={2}
              maxLength={53}
              placeholder="Texto de apresentação (Máximo 53 caracteres)"
              style={{ width: '100%', border: '1px solid #ccc' }}
              value={texto}
              onBlur={verificarTexto}
              onChange={(e) => {
                const texto = e.target.value;
                if(texto.length <= 53) {
                  setTexto(e.target.value)
                }   
              }}
            />

            {erroTexto && (
              <span className='text-xs text-red-500'>
                Este campo é obrigatório
              </span>
            )}

            <p className='text-blue-600 dark:text-sky-400'>Clique abaixo para importar a foto</p>
            
            <TextField type="file" onChange={importarFoto} fullWidth slotProps={{ htmlInput: {accept: 'image/png, image/jpeg, image/jpg'},}}/>

            <Button disabled={erroFoto || erroCargo || erroNome || erroProjetos || erroSeguidores || erroSeguindo || erroTexto} onClick={ gerarCard} sx={{backgroundColor: "#f7931e",color: "#fff",fontWeight: "bold", borderRadius: "20px",border: "2px solid #fff",paddingX: 3,"&:hover": {backgroundColor: "#e67e00",},}}>Gerar card</Button>
          </Stack>
        </div>     
      </FormControl>

      {alerta && <Box sx={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 1301,pointerEvents: 'none' }}>{alerta}</Box>}


    </div>
  );
}

export default PaginaInicial;
