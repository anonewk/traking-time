import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// material
import {
  Card,
  Table,
  Stack,
  Button,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
} from '@mui/material';
// components
import {useDispatch, useSelector} from "react-redux";
import moment, {locale} from "moment";
import Page from '../components/Page';
import Label from '../components/Label';
import Scrollbar from '../components/Scrollbar';
import Iconify from '../components/Iconify';
import SearchNotFound from '../components/SearchNotFound';
import { UserListHead, UserListToolbar, UserMoreMenu } from '../sections/@dashboard/user';
// mock
import FormDialog from "../components/FormDialog";
import FormDialogEdit from "../components/FormDialogEdit";

moment.locale('fr', {
  months : 'janvier_février_mars_avril_mai_juin_juillet_août_septembre_octobre_novembre_décembre'.split('_'),
  monthsShort : 'janv._févr._mars_avr._mai_juin_juil._août_sept._oct._nov._déc.'.split('_'),
  monthsParseExact : true,
  weekdays : 'dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi'.split('_'),
  weekdaysShort : 'dim._lun._mar._mer._jeu._ven._sam.'.split('_'),
  weekdaysMin : 'Di_Lu_Ma_Me_Je_Ve_Sa'.split('_'),
  weekdaysParseExact : true,
  longDateFormat : {
    LT : 'HH:mm',
    LTS : 'HH:mm:ss',
    L : 'DD/MM/YYYY',
    LL : 'D MMMM YYYY',
    LLL : 'D MMMM YYYY HH:mm',
    LLLL : 'dddd D MMMM YYYY HH:mm'
  },
  calendar : {
    sameDay : '[Aujourd’hui à] LT',
    nextDay : '[Demain à] LT',
    nextWeek : 'dddd [à] LT',
    lastDay : '[Hier à] LT',
    lastWeek : 'dddd [dernier à] LT',
    sameElse : 'L'
  },
  relativeTime : {
    future : 'dans %s',
    past : 'il y a %s',
    s : 'quelques secondes',
    m : 'une minute',
    mm : '%d minutes',
    h : 'une heure',
    hh : '%d heures',
    d : 'un jour',
    dd : '%d jours',
    M : 'un mois',
    MM : '%d mois',
    y : 'un an',
    yy : '%d ans'
  },
  dayOfMonthOrdinalParse : /\d{1,2}(er|e)/,
  ordinal (number) {
    return number + (number === 1 ? 'er' : 'e');
  },
  meridiemParse : /PD|MD/,

  // In case the meridiem units are not separated around 12, then implement
  // this function (look at locale/id.js for an example).
  // meridiemHour : function (hour, meridiem) {
  //     return /* 0-23 hour, given meridiem token and hour 1-12 */ ;
  // },
  meridiem (hours, minutes, isLower) {
    return hours < 12 ? 'PD' : 'MD';
  },
  week : {
    dow : 1, // Monday is the first day of the week.
    doy : 4  // Used to determine first week of the year.
  }
});

// ----------------------------------------------------------------------
const labelTimeSpent = `Temp passé en ${  moment(new Date()).format('MMM').toString()} (Heure)`;
const TABLE_HEAD = [
  { id: 'name', label: 'Task', alignRight: false },
  { id: 'company', label: labelTimeSpent, alignRight: false },
  { id: 'role', label: 'Date de création', alignRight: false },
  { id: 'isVerified', label: 'Date de mise à jour', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false },
  { id: '' },
];
console.log(moment(new Date()).format('MMM'))
// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function Tasks(props) {
  const dispatch = useDispatch()
  const tasksReducer = useSelector(state => state.tasksReducer);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [open, setOpen] = useState(false);

  const [openEdit, setOpenEdit] = useState(false);

  const [taskEditSelected, setTaskEditSelected] = useState({});
  useEffect(() => {
    setTaskEditSelected(taskEditSelected)
  }, [taskEditSelected])
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = tasksReducer.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClickOpenEdit = () => {
    setOpenEdit(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleCloseEdit = () => {
    setOpenEdit(false);
    /* setTaskEditSelected({}) */
  };
  const handleSendDataModal = (data) => {
    setTaskEditSelected(data)
    handleClickOpenEdit()
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - tasksReducer.length) : 0;

  const filteredUsers = applySortFilter(tasksReducer, getComparator(order, orderBy), filterName);

  const isUserNotFound = filteredUsers.length === 0;

  return (
      <Page title="User">
        <Container>
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
            <Typography variant="h4" gutterBottom>
              Tasks
            </Typography>
            <Button variant="contained" component={RouterLink} to="#" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleClickOpen}>
              New task
            </Button>
          </Stack>

          <Card>
            <UserListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} />

            <Scrollbar>
              <TableContainer sx={{ minWidth: 800 }}>
                <Table>
                  <UserListHead
                      order={order}
                      orderBy={orderBy}
                      headLabel={TABLE_HEAD}
                      rowCount={tasksReducer.length}
                      numSelected={selected.length}
                      onRequestSort={handleRequestSort}
                      onSelectAllClick={handleSelectAllClick}
                  />
                  <TableBody>
                    {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                      const { id, task, timeSpent, createdAt, updatedAt, status } = row;
                      const isItemSelected = selected.indexOf(task) !== -1;

                      return (
                          <TableRow
                              hover
                              key={id}
                              tabIndex={-1}
                              role="checkbox"
                              selected={isItemSelected}
                              aria-checked={isItemSelected}
                          >
                            <TableCell padding="checkbox">
                              <Checkbox checked={isItemSelected} onChange={(event) => handleClick(event, task)} />
                            </TableCell>
                            <TableCell component="th" scope="row" padding="none">
                              <Stack direction="row" alignItems="center" spacing={2}>
                                <Typography variant="subtitle2" noWrap>
                                  {task ?? ''}
                                </Typography>
                              </Stack>
                            </TableCell>
                            <TableCell align="left">{timeSpent ?? ''}</TableCell>
                            <TableCell align="left">{moment(createdAt ?? '').format('lll')}</TableCell>
                            <TableCell align="left">{updatedAt.length !== 0 && moment(updatedAt ?? '').format('lll')}</TableCell>
                            <TableCell align="left">
                              {/* 'default', 'primary', 'secondary', 'info', 'success', 'warning', 'error' */}
                              <Label variant="ghost" color={'success'}>
                                {sentenceCase(status ?? '')}
                              </Label>
                            </TableCell>

                            <TableCell align="right">
                              <UserMoreMenu
                                  task={row}
                                  handleSendDataModal={handleSendDataModal}
                                  dispatch={dispatch}
                              />
                            </TableCell>
                          </TableRow>
                      );
                    })}
                    {emptyRows > 0 && (
                        <TableRow style={{ height: 53 * emptyRows }}>
                          <TableCell colSpan={6} />
                        </TableRow>
                    )}
                  </TableBody>
                  {isUserNotFound && (
                      <TableBody>
                        <TableRow>
                          <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                            <SearchNotFound searchQuery={filterName} />
                          </TableCell>
                        </TableRow>
                      </TableBody>
                  )}
                </Table>
              </TableContainer>
            </Scrollbar>

            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={tasksReducer.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Card>
        </Container>
        <FormDialog
            open={open}
            setOpen={setOpen}
            handleClose={handleClose}
            handleClickOpen={handleClickOpen}
            dispatch={dispatch}
            applicationReducer={props.applicationReducer}
            taskEditSelected={taskEditSelected}
        />
        <FormDialogEdit
            openEdit={openEdit}
            setOpenEdit={setOpenEdit}
            handleCloseEdit={handleCloseEdit}
            dispatch={dispatch}
            applicationReducer={props.applicationReducer}
            taskEditSelected={taskEditSelected}
        />
      </Page>
  );
}
