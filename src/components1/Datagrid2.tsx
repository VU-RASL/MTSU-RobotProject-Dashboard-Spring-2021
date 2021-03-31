import * as React from "react";
import "jqwidgets-scripts/jqwidgets/styles/jqx.base.css";
import JqxGrid, {
    IGridProps,
    jqx,
} from "jqwidgets-scripts/jqwidgets-react-tsx/jqxgrid";
import JqxTreeGrid, { ITreeGridProps} from 'jqwidgets-scripts/jqwidgets-react-tsx/jqxtreegrid';

// http://jsfiddle.net/chris3i/epcqyeat/2/
// https://www.jqwidgets.com/community/topic/mapping-to-nested-json-children-within-the-grid/
// https://www.jqwidgets.com/community/topic/2-grids-nested-at-the-same-level/

interface ChartData {
    data: Array<any>
    columns: Array<any>;
}

class Datagrid2 extends React.PureComponent<ChartData,ITreeGridProps> {
    private myTreeGrid = React.createRef<JqxTreeGrid>();
    constructor(props: any) {
        super(props);
       
        
        const source: any = {
            dataFields: [
              { name: 'name', type: 'string' },
              { name: 'highest_level_played', map:'musical_task_data>highest_level_played' },
              { name: 'highest_level_played', map:'paint_task_data>highest_level_played' },
              
            ],
            dataType: 'json',
            hierarchy:
            {
                record: 'name',
               
            },
            id: '_id',
            localData: this.props.data
          };

          const dataAdapter: any = new jqx.dataAdapter(source);
          this.state = {
            columnGroups: [{ align: 'left', name: 'Musical Data', text: 'Music Data' },{ align: 'right', name: 'Paint Data', text: 'Paint Data' } ],
            columns: [
              { dataField: 'name',  text: 'name', width: 200 },
              { dataField: 'highest_level_played', columnGroup:'Music Data',text: 'highest_level_played', width: 250 }, 
              { dataField: 'highest_level_playe', columnGroup:'Paint Data',text: 'highest_level_played', width: 250 }
            ],
          
            source: dataAdapter,
            
          }
        }
        
    

    componentDidMount(){
        //console.log(this.props.data)
       // console.log(this.props.columns)
    }

    

    render() {
        let myComponent;
    if(this.props.data!== null) {
        myComponent = <div>i am not empty</div>
    } else {
        myComponent = null
    }
        return (
           <div>{myComponent}
           
           
           <JqxTreeGrid
        // @ts-ignore
        
        source={this.state.source}
        sortable={true}
        columns={this.state.columns}
        columnGroups={this.state.columnGroups}
        
      />
           
           
           
           </div>
        );
    }
}
export default Datagrid2;