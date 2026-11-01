// Content from the thirteen expanded 07. Executive Summery Figma states.
export interface ExecutiveSummaryDetail { number?: string; text: string; page: string; }
export interface ExecutiveSummaryItem { id: string; title: string; number: string; details: ExecutiveSummaryDetail[]; }
export interface ExecutiveSummarySector { title: string; color: string; items: ExecutiveSummaryItem[]; }

export const executiveSummaryInsights: ExecutiveSummarySector[] = [
  {
    "title": "Defence",
    "color": "#D3992C",
    "items": [
      {
        "id": "insight-1",
        "title": "Emerging Technology",
        "number": "1",
        "details": [
          {
            "number": "1.1",
            "text": "Challenges in rapid adoption of emerging technology remains, due to significant security screening requirements for any new technology adoption. Limitations exist for the speed of being able to upskill employees in the use of any new technology.",
            "page": "defence_emerging_technology"
          },
          {
            "number": "1.2",
            "text": "Provisioning targeted training faster through short courses (often referred to as microcredentials). Leveraging Vocational Education and Training Units of Competency could be effective in responding to emerging technologies.",
            "page": "defence_emerging_technology_2"
          }
        ]
      },
      {
        "id": "insight-2",
        "title": "Transitioning Veterans",
        "number": "2",
        "details": [
          {
            "number": "2.1",
            "text": "The Vocational Education and Training (VET) system remains important for the ADF as it provides a national standard, with meaningful qualifications written by industry, for industry.",
            "page": "defence_transitioning_veterans"
          },
          {
            "number": "2.2",
            "text": "Greater focus is required to support those transitioning (including veterans) to articulate the transferability of their VET qualifications and the relevance of their ADF experience to the civilian workforce. Where support is available, the information provided could be bolstered.",
            "page": "defence_transitioning_veterans_2"
          }
        ]
      }
    ]
  },
  {
    "title": "Fire and Emergency Services",
    "color": "#C9481A",
    "items": [
      {
        "id": "insight-3",
        "title": "Disaster Recovery",
        "number": "3",
        "details": [
          {
            "number": "1.1",
            "text": "Specialist disaster recovery functions are operationally focused, a more contemporary approach now requires capabilities related to the unique aspects of working with communities that may be grieving or socially, emotionally and financially impacted.",
            "page": "fes_disaster_recovery"
          },
          {
            "number": "1.2",
            "text": "Challenges in access to nationally accredited disaster recovery training products leads to inconsistencies in recovery outcomes, reduced community trust and limits the ability of communities to rebuild from the impacts of disasters.",
            "page": "fes_disaster_recovery_2"
          },
          {
            "number": "1.3",
            "text": "Australia is experiencing a critical challenge in maintaining capability to use fire effectively in the landscape, particularly for complex prescribed burning and backburning during bushfire suppression.",
            "page": "fes_disaster_recovery_3"
          }
        ]
      },
      {
        "id": "insight-4",
        "title": "Surf Life Saving First Aid",
        "number": "4",
        "details": [
          {
            "number": "2.1",
            "text": "The HLTAID010 unit of competency is an entry-level first aid training product that is no longer meeting the operational needs for volunteer surf lifesavers.",
            "page": "fes_surf_life_saving_first_aid"
          }
        ]
      },
      {
        "id": "insight-5",
        "title": "Hazardous Materials",
        "number": "5",
        "details": [
          {
            "number": "3.1",
            "text": "Incidents involving hazardous materials are becoming increasingly important while current training may be limiting in some Fire and Emergency Services organisations ability to deliver this type of service.",
            "page": "fes_hazardous_materials"
          }
        ]
      }
    ]
  },
  {
    "title": "Access to VET Qualifications and Training Delivery Partners",
    "color": "#0D71A3",
    "items": [
      {
        "id": "insight-6",
        "title": "Digital Forensics",
        "number": "6",
        "details": [
          {
            "number": "1.1",
            "text": "Skills shortages and strong demand for similar skills may require the establishment of multiple entry pathways for digital forensic professionals into policing.",
            "page": "police_digital_forensics"
          },
          {
            "number": "1.2",
            "text": "The VET system is well established to deliver a nationally consistent approach to training, however, the Police Training Package currently does not contain a qualification specialising in digital forensics.",
            "page": "police_digital_forensics_2"
          }
        ]
      },
      {
        "id": "insight-7",
        "title": "Regional and remote police leadership",
        "number": "7",
        "details": [
          {
            "number": "2.1",
            "text": "Police officers being required to take on more leadership responsibilities earlier in their careers, particularly in regional, rural and remote areas, where workforce shortages are more pronounced. This may require more support in accelerating leadership skills development.",
            "page": "police_regional_remote_leadership"
          }
        ]
      }
    ]
  }
];

export const executiveSummaryStrategies: ExecutiveSummarySector[] = [
  {
    "title": "Defence",
    "color": "#D3992C",
    "items": [
      {
        "id": "strategy-1",
        "title": "Support Defence skill and capability requirements to operationalise drones",
        "number": "1",
        "details": [
          {
            "text": "Map current Defence micro-credentials on drones and unmanned aerial systems (UAS) to existing units of competency from current VET qualifications.",
            "page": "defence_workforce_strategies#strategy-1"
          }
        ]
      },
      {
        "id": "strategy-2",
        "title": "Support transition of Defence Veterans to civilian workforce",
        "number": "2",
        "details": [
          {
            "text": "Support Recommendation 83(c) of the Royal Commission into Defence and Veteran Suicide by supporting up-to-date information facilitated by state and territory initiatives that assist transitioning veterans.",
            "page": "defence_workforce_strategies#strategy-2"
          }
        ]
      }
    ]
  },
  {
    "title": "Fire and Emergency Services",
    "color": "#C9481A",
    "items": [
      {
        "id": "strategy-3",
        "title": "Support uptake of disaster recovery training products",
        "number": "3",
        "details": [
          {
            "text": "Strengthen capabilities of disaster recovery for Fire and Emergency Services and Government personnel by promoting the uptake of disaster recovery training products.",
            "page": "fes_workforce_strategies#strategy-1"
          }
        ]
      },
      {
        "id": "strategy-4",
        "title": "Review first aid units of competency for Surf Life Saving in the Certificate II in Public Safety (Aquatic Rescue)",
        "number": "4",
        "details": [
          {
            "text": "Ensure the Certificate II in Public Safety (Aquatic Rescue) reflects the first aid requirements of Surf Life Saving.",
            "page": "fes_workforce_strategies#strategy-2"
          }
        ]
      },
      {
        "id": "strategy-5",
        "title": "Review prerequisite requirements for PUAFIR306 Identify, detect and monitor hazardous materials at an incident",
        "number": "5",
        "details": [
          {
            "text": "Support increased access to hazardous materials training by reviewing a key unit of competency for the Fire and Emergency Services industry.",
            "page": "fes_workforce_strategies#strategy-3"
          }
        ]
      }
    ]
  },
  {
    "title": "Access to VET Qualifications and Training Delivery Partners",
    "color": "#0D71A3",
    "items": [
      {
        "id": "strategy-6",
        "title": "Develop Training Products for Digital Forensics",
        "number": "6",
        "details": [
          {
            "text": "Develop a digital forensics qualification to be included in the POL Police Training Package.",
            "page": "police_workforce_strategies"
          }
        ]
      }
    ]
  }
];
