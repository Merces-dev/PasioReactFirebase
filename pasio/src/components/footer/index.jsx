import React from 'react'
import Logo from '../../utils/img/pasio.png'
import jwt_decode from 'jwt-decode'

import "../footer/index.css"
const Footer = () => {
  const token = localStorage.getItem('token');
  if (token === null) {
    decoded = 'unlogged'
  } else {
    var decoded = jwt_decode(token);
  }
  const renderAccount = () => {
    if (token === null) {
      return (
        <div className='column'>
          <a href="/login">Login</a>

          <a href="/cadastro">Cadastre-se</a>
        </div>

      )
    } else {
      return (
        <div className='column'>
          <a href="/admin/dashboard">Dashboard</a>

        </div>
      )
    }
  }
  return (
    <div className='totalFooter' >

      <div className='content'>
        <div className='cardFooterLinks'>
          <a href="/">Início</a>
          {renderAccount()}

          <a href="/servicos">Serviços</a>
          <a href="/oportunidades">Oportunidades</a>
          <a href="/quemsomos#trabalheconosco">Trabalhe Conosco</a>
          <a href="/quemsomos">Quem Somos</a>


        </div>
        <div className='cardFooter'>
          <a href="/"><img src={Logo} alt="logo" /></a>
        </div>

        <div className='cardFooterSocial'>
          <a href="a"><img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbG5zOnN2Z2pzPSJodHRwOi8vc3ZnanMuY29tL3N2Z2pzIiB3aWR0aD0iNTEyIiBoZWlnaHQ9IjUxMiIgeD0iMCIgeT0iMCIgdmlld0JveD0iMCAwIDUxMiA1MTIiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDUxMiA1MTIiIHhtbDpzcGFjZT0icHJlc2VydmUiIGNsYXNzPSIiPjxnPjxwYXRoIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgZD0ibTc1IDUxMmgxNjd2LTE4MmgtNjB2LTYwaDYwdi03NWMwLTQxLjM1NTQ2OSAzMy42NDQ1MzEtNzUgNzUtNzVoNzV2NjBoLTYwYy0xNi41NDI5NjkgMC0zMCAxMy40NTcwMzEtMzAgMzB2NjBoODcuMjkyOTY5bC0xMCA2MGgtNzcuMjkyOTY5djE4MmgxMzVjNDEuMzU1NDY5IDAgNzUtMzMuNjQ0NTMxIDc1LTc1di0zNjJjMC00MS4zNTU0NjktMzMuNjQ0NTMxLTc1LTc1LTc1aC0zNjJjLTQxLjM1NTQ2OSAwLTc1IDMzLjY0NDUzMS03NSA3NXYzNjJjMCA0MS4zNTU0NjkgMzMuNjQ0NTMxIDc1IDc1IDc1em0tNDUtNDM3YzAtMjQuODEyNSAyMC4xODc1LTQ1IDQ1LTQ1aDM2MmMyNC44MTI1IDAgNDUgMjAuMTg3NSA0NSA0NXYzNjJjMCAyNC44MTI1LTIwLjE4NzUgNDUtNDUgNDVoLTEwNXYtMTIyaDcyLjcwNzAzMWwyMC0xMjBoLTkyLjcwNzAzMXYtMzBoOTB2LTEyMGgtMTA1Yy01Ny44OTg0MzggMC0xMDUgNDcuMTAxNTYyLTEwNSAxMDV2NDVoLTYwdjEyMGg2MHYxMjJoLTEzN2MtMjQuODEyNSAwLTQ1LTIwLjE4NzUtNDUtNDV6bTAgMCIgZmlsbD0iIzk5MzEzZCIgZGF0YS1vcmlnaW5hbD0iIzAwMDAwMCIgc3R5bGU9IiIgY2xhc3M9IiI+PC9wYXRoPjwvZz48L3N2Zz4=" alt='Facebook' /></a>
          <a href="b"><img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbG5zOnN2Z2pzPSJodHRwOi8vc3ZnanMuY29tL3N2Z2pzIiB3aWR0aD0iNTEyIiBoZWlnaHQ9IjUxMiIgeD0iMCIgeT0iMCIgdmlld0JveD0iMCAwIDUxMiA1MTIiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDUxMiA1MTIiIHhtbDpzcGFjZT0icHJlc2VydmUiIGNsYXNzPSIiPjxnPjxwYXRoIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgZD0ibTc1IDUxMmgzNjJjNDEuMzU1NDY5IDAgNzUtMzMuNjQ0NTMxIDc1LTc1di0zNjJjMC00MS4zNTU0NjktMzMuNjQ0NTMxLTc1LTc1LTc1aC0zNjJjLTQxLjM1NTQ2OSAwLTc1IDMzLjY0NDUzMS03NSA3NXYzNjJjMCA0MS4zNTU0NjkgMzMuNjQ0NTMxIDc1IDc1IDc1em0tNDUtNDM3YzAtMjQuODEyNSAyMC4xODc1LTQ1IDQ1LTQ1aDM2MmMyNC44MTI1IDAgNDUgMjAuMTg3NSA0NSA0NXYzNjJjMCAyNC44MTI1LTIwLjE4NzUgNDUtNDUgNDVoLTM2MmMtMjQuODEyNSAwLTQ1LTIwLjE4NzUtNDUtNDV6bTAgMCIgZmlsbD0iIzk5MzEzZCIgZGF0YS1vcmlnaW5hbD0iIzAwMDAwMCIgc3R5bGU9IiIgY2xhc3M9IiI+PC9wYXRoPjxwYXRoIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgZD0ibTI1NiAzOTFjNzQuNDM3NSAwIDEzNS02MC41NjI1IDEzNS0xMzVzLTYwLjU2MjUtMTM1LTEzNS0xMzUtMTM1IDYwLjU2MjUtMTM1IDEzNSA2MC41NjI1IDEzNSAxMzUgMTM1em0wLTI0MGM1Ny44OTg0MzggMCAxMDUgNDcuMTAxNTYyIDEwNSAxMDVzLTQ3LjEwMTU2MiAxMDUtMTA1IDEwNS0xMDUtNDcuMTAxNTYyLTEwNS0xMDUgNDcuMTAxNTYyLTEwNSAxMDUtMTA1em0wIDAiIGZpbGw9IiM5OTMxM2QiIGRhdGEtb3JpZ2luYWw9IiMwMDAwMDAiIHN0eWxlPSIiIGNsYXNzPSIiPjwvcGF0aD48cGF0aCB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGQ9Im00MDYgMTUxYzI0LjgxMjUgMCA0NS0yMC4xODc1IDQ1LTQ1cy0yMC4xODc1LTQ1LTQ1LTQ1LTQ1IDIwLjE4NzUtNDUgNDUgMjAuMTg3NSA0NSA0NSA0NXptMC02MGM4LjI2OTUzMSAwIDE1IDYuNzMwNDY5IDE1IDE1cy02LjczMDQ2OSAxNS0xNSAxNS0xNS02LjczMDQ2OS0xNS0xNSA2LjczMDQ2OS0xNSAxNS0xNXptMCAwIiBmaWxsPSIjOTkzMTNkIiBkYXRhLW9yaWdpbmFsPSIjMDAwMDAwIiBzdHlsZT0iIiBjbGFzcz0iIj48L3BhdGg+PC9nPjwvc3ZnPg==" alt='Instagram' /></a>
          <a href="c"><img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbG5zOnN2Z2pzPSJodHRwOi8vc3ZnanMuY29tL3N2Z2pzIiB3aWR0aD0iNTEyIiBoZWlnaHQ9IjUxMiIgeD0iMCIgeT0iMCIgdmlld0JveD0iMCAwIDUxMiA1MTIiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDUxMiA1MTIiIHhtbDpzcGFjZT0icHJlc2VydmUiIGNsYXNzPSIiPjxnPjxwYXRoIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgZD0ibTQzNyAwaC0zNjJjLTQxLjM1NTQ2OSAwLTc1IDMzLjY0NDUzMS03NSA3NXYzNjJjMCA0MS4zNTU0NjkgMzMuNjQ0NTMxIDc1IDc1IDc1aDM2MmM0MS4zNTU0NjkgMCA3NS0zMy42NDQ1MzEgNzUtNzV2LTM2MmMwLTQxLjM1NTQ2OS0zMy42NDQ1MzEtNzUtNzUtNzV6bTQ1IDQzN2MwIDI0LjgxMjUtMjAuMTg3NSA0NS00NSA0NWgtMzYyYy0yNC44MTI1IDAtNDUtMjAuMTg3NS00NS00NXYtMzYyYzAtMjQuODEyNSAyMC4xODc1LTQ1IDQ1LTQ1aDM2MmMyNC44MTI1IDAgNDUgMjAuMTg3NSA0NSA0NXptMCAwIiBmaWxsPSIjOTkzMTNkIiBkYXRhLW9yaWdpbmFsPSIjMDAwMDAwIiBzdHlsZT0iIiBjbGFzcz0iIj48L3BhdGg+PHBhdGggeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBkPSJtOTEgNDIyaDkwdi0yMTJoLTkwem0zMC0xODJoMzB2MTUyaC0zMHptMCAwIiBmaWxsPSIjOTkzMTNkIiBkYXRhLW9yaWdpbmFsPSIjMDAwMDAwIiBzdHlsZT0iIiBjbGFzcz0iIj48L3BhdGg+PHBhdGggeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBkPSJtMzMxLjA4NTkzOCAyMTBjLS4wMjczNDQgMC0uMDU4NTk0IDAtLjA4NTkzOCAwLTEwLjM3MTA5NCAwLTIwLjQ3MjY1NiAxLjczNDM3NS0zMCA1LjEwMTU2MnYtNS4xMDE1NjJoLTkwdjIxMmg5MHYtMTA3YzAtOC4yNjk1MzEgNi43MzA0NjktMTUgMTUtMTVzMTUgNi43MzA0NjkgMTUgMTV2MTA3aDkwdi0xMTcuMzEyNWMwLTQ4LjU0Njg3NS0zOS4zODI4MTItOTQuNjQwNjI1LTg5LjkxNDA2Mi05NC42ODc1em01OS45MTQwNjIgMTgyaC0zMHYtNzdjMC0yNC44MTI1LTIwLjE4NzUtNDUtNDUtNDVzLTQ0Ljk5NjA5NCAyMC4xODc1LTQ1IDQ0Ljk5NjA5NHY3Ny4wMDM5MDZoLTMwdi0xNTJoMzB2MzAuMDE5NTMxbDI0LjAwNzgxMi0xOC4wMzEyNWMxMC40NDE0MDctNy44NDM3NSAyMi44ODY3MTktMTEuOTg4MjgxIDM1Ljk5MjE4OC0xMS45ODgyODFoLjA1ODU5NGMzMS45Mjk2ODcuMDMxMjUgNTkuOTQxNDA2IDMwLjI1NzgxMiA1OS45NDE0MDYgNjQuNjg3NXptMCAwIiBmaWxsPSIjOTkzMTNkIiBkYXRhLW9yaWdpbmFsPSIjMDAwMDAwIiBzdHlsZT0iIiBjbGFzcz0iIj48L3BhdGg+PHBhdGggeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBkPSJtOTEgMTgwaDkwdi05MGgtOTB6bTMwLTYwaDMwdjMwaC0zMHptMCAwIiBmaWxsPSIjOTkzMTNkIiBkYXRhLW9yaWdpbmFsPSIjMDAwMDAwIiBzdHlsZT0iIiBjbGFzcz0iIj48L3BhdGg+PC9nPjwvc3ZnPg==" alt='Linkedin' />    </a>
        </div>
        <div className='cardFooterMobile'>
          <a href="/"><img src={Logo} alt="Logo Pasio" /></a>
        </div>
      </div>
      <div className='developed' >
        <div className='developed02'>
          <a href="https://www.linkedin.com/in/giovani-merces-da-silva-b1a592191/" target="_blank">  Desenvolvido por <b> Merces-Dev</b> </a>
        </div>
      </div>
    </div>
  );
}

export default Footer;
