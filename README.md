# Stubble → Value 🌾
### Turning paddy stubble from a burning problem into an economic opportunity

**Live Website:** https://stubble2value.lovable.app/  
**GitHub Repository:** https://github.com/APSingh182006/stubble2value

## The Problem

Every year, the management of paddy stubble creates challenges for farmers. Open-field burning contributes to air pollution and wastes agricultural biomass that could potentially be used as a resource. Farmers may lack accessible information about alternative uses, estimated returns, and businesses that process agricultural residue.

## Our Solution

**Stubble → Value** is a web platform designed to help farmers explore alternatives to burning paddy straw. It estimates the amount of residue available, compares potential reuse pathways, and helps users discover businesses that may be relevant to their agricultural residue.

Our goal is to make residue management more accessible, practical, and economically informed.

## Key Features

- **Residue Calculator:** Estimate available paddy residue using farm area and production information.
- **Reuse Recommendations:** Explore potential applications such as biomass pellets, packaging, and other residue-based products.
- **Estimated Value Comparison:** Compare illustrative gross returns, transportation costs, and estimated net returns.
- **Find Buyers:** Explore a demonstration marketplace showing how a future local buyer-matching system could work. Its fictional businesses, prices, and distances are explicitly labeled as demo data.
- **Find Processors:** Search a directory of potential biomass processors using location, state, and pathway filters.
- **Transparent Data Labels:** Distinguish illustrative calculations and unverified procurement information from confirmed commercial offers.

## AWS Architecture

The project uses AWS to power its residue estimation and recommendation calculations.

1. **Frontend:** The web application is built with Lovable and published at the live website URL above.
2. **Amazon API Gateway:** Exposes an HTTP API endpoint that receives calculator requests from the frontend.
3. **AWS Lambda:** Runs the Python calculation logic, estimates residue availability, evaluates reuse options, and returns structured results.
4. **Frontend integration:** Displays the response, including recommendations and estimated values, to the user.

### Request Flow

`Farmer → Web Calculator → Amazon API Gateway → AWS Lambda → Calculated Results → Web Interface`

The backend is designed to separate calculation logic from the user interface and can be extended with verified market data and additional services in the future.

## Data Sources

The processor directory uses publicly accessible business-directory information from India's SAMARTH portal, associated with the Ministry of Power.

- SAMARTH vendor details: https://samarth.powermin.gov.in/account/vendordetails
- SAMARTH pellet trader and aggregator directory: https://samarth.powermin.gov.in/account/pellettraderaggregator
- SAMARTH vendor list: https://samarth.powermin.gov.in/account/vendorlist

The current directory is a limited snapshot, not a comprehensive or automatically updated national database. A directory listing does not establish that a business currently accepts loose paddy straw directly from farmers.

## Important Limitations

- Calculated residue quantities depend on user inputs and model assumptions.
- Prices, transportation costs, and returns are estimates, not guaranteed earnings or live market quotations.
- Processor listings require direct verification of procurement, accepted materials, quantities, prices, and transport arrangements.
- The buyer marketplace contains fictional demonstration data and must not be interpreted as a list of real commercial offers.
- The platform provides preliminary decision support, not a guarantee of sales, profitability, or environmental impact.

## Future Scope

- Build partnerships with verified processors and farmer organisations.
- Add verified procurement requirements, current prices, and collection arrangements.
- Expand coverage across states and agricultural residue pathways.
- Improve estimates using locally validated agricultural and transportation data.
- Develop a more complete farmer-to-processor connection workflow.

## Technology Stack

- Frontend: React, TypeScript, and Vite
- Development and hosting: Lovable
- Backend: Python on AWS Lambda
- API: Amazon API Gateway (HTTP API)
- Version control: Git and GitHub

## AI Tools Disclosure

AI-assisted development tools, including Lovable and ChatGPT, were used during project development and refinement. The project also integrates a custom AWS Lambda calculation backend exposed through Amazon API Gateway.

## Project Goal

**Don't burn it. Turn it into value.**

Stubble → Value aims to help farmers explore more useful alternatives to paddy-stubble burning while laying the groundwork for better connections between agricultural residue producers and potential processors.
