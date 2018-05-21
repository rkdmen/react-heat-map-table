import React, { Component } from 'react';
import { Panel, Accordion, Button, Grid, Row, Col, Table } from 'react-bootstrap';
//
export default class TableContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      caretIcon: 'fa-caret-left',
      display: 'inline-block',
      hdr: null,
      tableData: null,
      tableHeader: null,
    }
  };

  componentDidMount() {
    this.generateMatrixTableData(this.props);
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.reportData) {
      this.generateMatrixTableData(nextProps);
    }
  };

  valueFormat = (val, title = false, idx) => {
    if (val.match(/[a-z]/i)) return val; //If it contains string(episode), return episode.
    let { tableHeader } = this.state;
    if (title) val = `${title}\nx\n${tableHeader[idx]}\n${val}`; //For title attribute
    return val + '%';
  }

  getFillColor = (val) => {
    // return
    if (val.match(/[a-z]/i)) return; //If it contains string(episode)
    const { maxValue, minValue } = this.state;
    val = val / maxValue;
    if (val >= .99) return '#F8E9EC';
    if (val >= .90) return '#F2D5DB';
    if (val >= .80) return '#EBC0C9';
    if (val >= .70) return '#E5ACB8';
    if (val >= .60) return '#DF98A6';
    if (val >= .50) return '#D88495';
    if (val >= .40) return '#D26F83';
    if (val >= .30) return '#CB5B72';
    if (val >= .20) return '#C54760';
    if (val >= .10) return '#BF334F';
    if (val >= .01) return '#B81E3D';
    return '#B20A2C'; //red
  }

  generateMatrixTableData = (nextProps) => {
    let tableData = [];
    let tableHeader = [];

    function randomNum() {
      return (Math.random() * .58).toFixed(2);
    }



    let fakeEpisodeName = [{ EP_NAME: 'Ep. FAMILY FUNNY BUSINESS 1' }, { EP_NAME: 'Ep. HIGH TECH REDNECK 2' }, { EP_NAME: 'Ep. CEO FOR A DAY 3' }, { EP_NAME: 'Ep. BASS MAN STANDING 4' }, { EP_NAME: 'Ep. BRAND OF BROTHERS 5' }, { EP_NAME: 'Ep. FAMILY FUNNY BUSINESS 6' }, { EP_NAME: 'Ep. HIGH TECH REDNECK 7' }, { EP_NAME: 'Ep. CEO FOR A DAY 8' }, { EP_NAME: 'Ep. BASS MAN STANDING 9' }, { EP_NAME: 'Ep. BRAND OF BROTHERS 10' }, { EP_NAME: 'Ep. FAMILY FUNNY BUSINESS 11' }, { EP_NAME: 'Ep. HIGH TECH REDNECK 12' }, { EP_NAME: 'Ep. CEO FOR A DAY 13' }, { EP_NAME: 'Ep. BASS MAN STANDING 14' }, { EP_NAME: 'Ep. BRAND OF BROTHERS 15' }, { EP_NAME: 'Ep. FAMILY FUNNY BUSINESS 16' }, { EP_NAME: 'Ep. HIGH TECH REDNECK 17' }, { EP_NAME: 'Ep. CEO FOR A DAY 18' }, { EP_NAME: 'Ep. BASS MAN STANDING 19' }, { EP_NAME: 'Ep. BRAND OF BROTHERS 20' }, { EP_NAME: 'Ep. FAMILY FUNNY BUSINESS 21' }, { EP_NAME: 'Ep. HIGH TECH REDNECK 22' }, { EP_NAME: 'Ep. CEO FOR A DAY 23' }, { EP_NAME: 'Ep. BASS MAN STANDING 24' }, { EP_NAME: 'Ep. BRAND OF BROTHERS 25' }, { EP_NAME: 'Ep. BASS MAN STANDING 26' }, { EP_NAME: 'Ep. BRAND OF BROTHERS 27' }, { EP_NAME: 'Ep. BASS OF BUSINESS 28' }, { EP_NAME: 'Ep. BRAND OF BROTHERS 29' }, { EP_NAME: 'Ep.  OF BROTHERS 30' }];


    // fakeEpisodeName = fakeEpisodeName.slice(0,1);
    // fakeEpisodeName = fakeEpisodeName.slice(0,2);

    // fakeEpisodeName = fakeEpisodeName.slice(0,4);
    // fakeEpisodeName = fakeEpisodeName.slice(0,10);
    // fakeEpisodeName = fakeEpisodeName.slice(0,15);


    for (let data of fakeEpisodeName) {
      tableHeader.push(data.EP_NAME);
    }
    let allValue = [];

    for (let i = 0; i < tableHeader.length; i++) {
      let epName = tableHeader[i];
      let rowData = {};
      rowData['EP_NAME'] = epName;
      for (let y = 0; y < tableHeader.length; y++) {
        let value = randomNum();
        rowData['ep_' + y] = value;
        allValue.push(value);
      }
      tableData.push(rowData);
    }
    let maxValue = Math.max(...allValue);
    let minValue = Math.min(...allValue);
    this.setState({ tableData, tableHeader, minValue, maxValue });
  };

  removeAllHoverClass = () => {
    let component = this.componentContainer;
    let allClass_selectedSeason = component.getElementsByClassName('selected-ep');
    let allClass_selectedSeason_hdr = component.getElementsByClassName('selected-ep-hdr');
    while (allClass_selectedSeason.length) {
      allClass_selectedSeason[0].classList.remove("selected-ep");
    }
    while (allClass_selectedSeason_hdr.length) {
      allClass_selectedSeason_hdr[0].classList.remove("selected-ep-hdr");
    }
  }

  mouseOverHover = (evt) => {
    let targetDataSetSeason = evt.currentTarget.dataset.ep;
    let targetDataSetRowIdx = evt.currentTarget.dataset.rowIdx;
    let component = this.componentContainer;
    let allDataSet = component.querySelectorAll('[data-ep]');

    let hdrIdx = component.querySelectorAll('[data-hdr-idx');
    let rowIdx = component.querySelectorAll('[data-row-idx]');
    this.removeAllHoverClass();

    for (let el of hdrIdx) {
      //Highlight Header
      if (targetDataSetRowIdx === el.dataset.hdrIdx) el.classList.add('selected-ep-hdr');
    }
    for (let el of rowIdx) {
      //Highlight each row and selected column according to idx
      if (targetDataSetRowIdx === el.dataset.rowIdx) el.classList.add('selected-ep');
    }

    //add animation transition
    for (let el of allDataSet) {
      //highlight selected row.
      if (targetDataSetSeason === el.dataset.ep) el.classList.add('selected-ep');
      //Highlight column first cell
      if (targetDataSetSeason + '_col' === el.dataset.ep) el.classList.add('selected-ep-hdr');
    }
  }

  render() {
    const { tableData, tableHeader } = this.state;
    let tableOption = {
      height: '750px',
      width: '100%'
    }
    let styles = {
      tableBorder: {
        marginBottom: '15px',
        paddingTop: '10px'
      },
      table_header: {
        fontSize: '11.8px',
      },
      table: {
        // tableLayout: 'fixed'
      },
      exportIcon: {
        position: 'absolute',
        top: '0',
        right: '-3px'
      }
    };
    let customClass = `
      .matrix-table-wrapper {
        overflow: scroll;
        position: relative;
        height: ${tableOption.height};
        margin-bottom: 15px;
      }
      ._mm_table-fixed-hdr {
        position: sticky;
        margin: 0;
        top: 0;
        width:100%;
        border:0;
        z-index: 1;
      }
      ._mm_table-fixed-hdr table {
        margin: 0;
      }
      ._mm_table-fixed-body {
        display: block;
        max-height: 450px;
        width: 100%;
        top: 0px;
      }
      ._mm_table-th-inner-div {
        position: absolute;
        background: transparent;
        color: #fff;
        padding: 9px 25px;
        top: 0;
        margin-left: -25px;
        line-height: normal;
        border-left: 1px solid #800;
      }
      table.dup-matrix-table {
        margin: 0;
      }
      table.dup-matrix-table .dup-matrix-th {
        max-width: 95px!important;
        border-bottom: none!important;
      }
      .dup-matrix-table td,
      .dup-matrix-table th {
        border: thin solid #e4e4e4 !important;
        padding: 15px 1.5px !important;
        text-align: center;
        vertical-align: middle;
      }
      .dup-matrix-table .hideCol-th {
        background: white;
        height: 50px;
        min-width: 200px!important;
        width: 200px!important;
        border: none!important;
      }
      .dup-mtix-tr td:first-child {
        font-size: 11.8px;
        font-weight: 700;
        color: rgb(98, 179, 222)!important;
        width:200px!important;
        max-width:200px!important;
        position: sticky;
        left: -1px;
        z-index: 5;
      }
      .dup-mtix-tr:nth-child(odd) td:first-child {
        background: rgb(223, 249, 255); //skyblue
      }
      table.dup-matrix-table .td-highlight {
        background: #40ceef!important;
        box-shadow: inset 0px 0px 2px 0.6px #423535fa;
      }
      table.dup-matrix-table .selected-ep {
        transition: all ease-in-out 0.2s;
        background: #2196f3b3!important;
        color: white;
        opacity: .85;
        font-weight: 700;
      }
      table.dup-matrix-table .selected-ep-hdr {
        transition: all ease-in-out 0.2s;
        font-weight: 700;
        color: #45454e!important;
        opacity: 1;
      }
      td.dup-mtix-td {
        font-weight: 600;
        height: 3.5vw;
        border: 2px solid #f1f5f9!important;
        z-index: 1;
      }

      @media screen and (max-width: 767px){
          .dup-matrix-table  {
            table-layout: auto!important;
            display: table!important;
          }
        }
    `;

    return (
      <div className="__r-hm-table-container"  ref={el => this.componentContainer = el}>
        <style>{customClass}</style>
            {(() => {
              if(tableData){
                return (
                    <div style={styles.tableBorder} className='container-fluid table-responsive'>
                      <div className="matrix-table-wrapper">
                        <div className="_mm_table-fixed-hdr">
                          <Table
                            striped
                            className="dup-matrix-table _rel _mm_table-fixed-hdr-table"
                            style={styles.table}>
                            <thead>
                              <tr>
                                <th className='hideCol-th' style={{background:'white'}}></th>
                                {tableHeader.map((episode, idx)=>{
                                  return <th
                                          style={styles.table_header}
                                          key={'dup_matrix_th'+idx}
                                          // data-ep={ep}
                                          className='dup-matrix-th lgtGreyHdr _ellipsis'
                                          data-hdr-idx={idx+1}
                                          title={episode}>{episode}</th>
                                })}
                              </tr>
                            </thead>
                          </Table>
                        </div>

                        <div className="_mm_table-fixed-body" style={{position:'absolute', zIndex: 0}}>
                          <Table
                            striped
                            className="dup-matrix-table _rel _mm_table-fixed-body-table"
                            style={styles.table}>
                            <thead>
                              <tr>
                                <th className='hideCol-th'></th>
                                {tableHeader.map((episode, idx)=>{
                                  return <th
                                          style={styles.table_header}
                                          key={'dup_matrix_th'+idx}
                                          // data-ep={ep}
                                          className='dup-matrix-th lgtGreyHdr _ellipsis'
                                          data-hdr-idx={idx+1}
                                          title={episode}>
                                            {episode}
                                          </th>
                                })}
                              </tr>
                            </thead>
                            <tbody>
                              {tableData.map((epData, idx)=>{
                                  let keys = Object.keys(epData);
                                  let epName = epData['EP_NAME'];
                                  return (<tr key={'dup_matrix_tr_' + idx} className='dup-mtix-tr'>
                                      {keys.map((key, __idx)=>{
                                        return (<td key={'dup_matrix_td_' + __idx}
                                                    className={'_rel _ellipsis dup-mtix-td ' +  (idx + 1 === __idx ? 'td-highlight' : '')}
                                                    style={{background: this.getFillColor(epData[key])}}
                                                    onMouseOver={ __idx !== 0 ? this.mouseOverHover : ''}
                                                    onMouseOut={this.removeAllHoverClass }
                                                    data-row-idx={__idx}
                                                    data-ep={ __idx !== 0 ? epName : epName + '_col'}
                                                    title={this.valueFormat(epData[key], epName , __idx -1)}>
                                              {this.valueFormat(epData[key])}
                                          </td>)
                                      })}
                                  </tr>)
                                })}
                            </tbody>
                          </Table>
                        </div>
                      </div>
                    {/*<HeatMapColorLegend />*/}
                    </div>
                  )
              }
            })()}
      </div>
    );
  }
}