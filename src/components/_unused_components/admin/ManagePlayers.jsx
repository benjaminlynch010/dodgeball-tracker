import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Modal } from '@mui/material';
import { IconEdit } from '@tabler/icons-react';

import EditPlayerForm from '../../Admin/EditPlayerForm'
import AddPlayerForm from './AddPlayerForm';

export default function ManagePlayers() {

  const dispatch = useDispatch()
  const user = useSelector(store => store.user);
  const allPlayers = useSelector((store) => store.playersReducer)
  const [ playerToEdit, setPlayerToEdit ] = useState('')
  const [ isFormOpen, setIsFormOpen ] = useState(false)
  const [ isAddFormOpen, setIsAddFormOpen ] = useState(false);

  useEffect(() => {
    dispatch({ type: "FETCH_PLAYERS", payload: user });
  }, []);

const handleClick = (player) => {
  setIsFormOpen(true)
  setPlayerToEdit(player)
}

const handleAddPlayer = () => {
    setIsAddFormOpen(true)
}

const handleCancel = () => {
  setIsFormOpen(false);
  setIsAddFormOpen(false)
  setPlayerToEdit(null);
};
  


    return (
      <TableContainer component={Paper}>
        {isFormOpen && <EditPlayerForm player={playerToEdit} onClose={handleCancel} />}
        {isAddFormOpen && <AddPlayerForm onClose={handleCancel} />}
        <Button onClick={handleAddPlayer}>ADD PLAYER</Button>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Jersey Number</TableCell>
              <TableCell>Phone Number</TableCell>
              <TableCell>Referee Status</TableCell>
              <TableCell>Captain Status</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allPlayers.map((player) => (
              <TableRow key={player.id}>
                <TableCell component="th" scope="row">
                  {player.lastname + ', ' + player.firstname}
                </TableCell>
                <TableCell component="th" scope="row">
                  {player.jersey_number}
                </TableCell>
                <TableCell component="th" scope="row">
                  {player.phone_number}
                </TableCell>
                <TableCell component="th" scope="row">
                  {(player.can_referee) ? '✅' : ''}
                </TableCell>
                <TableCell component="th" scope="row">
                  {(player.captain) ? '✅' : ''}
                </TableCell>
                <TableCell align="right">
                  <Button 
                    onClick={() => handleClick(player)}
                    color="secondary">
                    <IconEdit size={24} />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
    
}

