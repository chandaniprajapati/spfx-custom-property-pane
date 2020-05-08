import { Version, Text } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneChoiceGroup,
  PropertyPaneToggle,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { escape, keys } from '@microsoft/sp-lodash-subset';

import styles from './CPPWebPart.module.scss';
import * as strings from 'CPPWebPartStrings';

export interface ICPPWebPartProps {
  simpleText: string;
  textOrImageType: string;
  imageUrl: string;
  enableToggle: boolean;
}

export default class CPPWebPart extends BaseClientSideWebPart<ICPPWebPartProps> {
  public render(): void {
    let renderHtml = `<div>
                        <div><b>Enable Toggle:</b> ${this.properties.enableToggle}</div>`;

    if (this.properties.enableToggle) {
      renderHtml += `<div><b>Link Type:</b> ${this.properties.textOrImageType}</div>`;

      if (this.properties.textOrImageType != undefined) {
        if (this.properties.textOrImageType === "Text") {
          renderHtml += `<div><b>Text:</b> ${this.properties.simpleText}</div>`;

        }
        if (this.properties.textOrImageType === "Image") {
          renderHtml += `<div><img src =${this.properties.imageUrl} height="150" width="150" alt="Image"</div>`;
        }
      }
    }
    renderHtml += `</div></div></div></div>`;
    this.domElement.innerHTML = renderHtml;
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    //create a variable for choice control
    let textOrImageType: any = [];

    //create a variable for image control
    let imageSourceControl: any = [];

    //create a variable for text control
    let simpleTextControl: any = [];

    
    if (this.properties.enableToggle) {
      textOrImageType = PropertyPaneChoiceGroup('textOrImageType', {
        label: 'Image/Text',
        options: [{
          key: 'Text',
          text: 'Text',
          checked: true
        },
        {
          key: 'Image',
          text: 'Image',
        }
        ]
      });

      if (this.properties.textOrImageType === "Text") {
        simpleTextControl = PropertyPaneTextField('simpleText', {
          label: "Text",
          placeholder: "Enter Text"
        });
      }
      else {
        imageSourceControl = PropertyPaneTextField('imageUrl', {
          label: "Image URL",
          placeholder: "Enter Image URL"
        });
      }
    }


    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneToggle('enableToggle', {
                  key: 'Enable Toggle',
                  label: 'Enable Toggle',
                  checked: true
                }),
                textOrImageType,
                simpleTextControl,
                imageSourceControl
              ]
            }
          ]
        }
      ]
    };
  }
}
