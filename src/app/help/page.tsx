"use client";
import { Image, Row, Table } from "antd";
import styles from "./page.module.css";
import help_select_scenarios from "../../assets/help/help_select_scenarios.png";
import help_add_chains from "../../assets/help/help_add_chains.png";
import help_select_target from "../../assets/help/help_select_target.png";
import help_add_models from "../../assets/help/help_add_models.png";
import help_steps from "../../assets/help/help_steps.png";
import help_molstar from "../../assets/help/help_molstar.png";
import help_scatter from "../../assets/help/help_scatter.png";
import help_heatmap from "../../assets/help/help_heatmap.png";
import help_model_matrix from "../../assets/help/help_model_matrix.png";

const RNApuzzles = [
  {
    key: "1",
    fileName: "PZ18_model00",
    source: "2TPY",
  },
  {
    key: "2",
    fileName: "PZ18_model01",
    source: "18_Szachniuk_1",
  },
  {
    key: "3",
    fileName: "PZ18_model02",
    source: "18_Lee_1",
  },
  {
    key: "4",

    fileName: "PZ18_model03",
    source: "18_YagoubAli_1",
  },
  {
    key: "5",
    fileName: "PZ18_model04",
    source: "18_Ding_1",
  },
  {
    key: "6",
    fileName: "PZ18_model05",
    source: "18_Chen_1",
  },
  {
    key: "7",
    fileName: "PZ18_model06",
    source: "18_Das_1",
  },
  {
    key: "8",
    fileName: "PZ18_model07",
    source: "18_Dokholyan_1",
  },
];

const columns = [
  {
    title: "File name",
    dataIndex: "fileName",
    key: "fileName",
  },
  {
    title: "Source",
    dataIndex: "source",
    key: "source",
  },
];

const Help = () => {
  return (
    <div className={styles.scenario}>
      <h1>Help</h1>
      <p>
        {`RNAtango provides a comprehensive platform for the analysis of torsion
        angles in nucleic acid structures. The system allows users to perform
        detailed evaluations and comparisons of torsion angles by following a
        series of structured scenarios. Each scenario is designed to accommodate
        different analytical needs, from single model assessments to comparative
        studies between multiple models.`}
      </p>

      <h5>1.1. Homepage and input data</h5>
      <p>
        {`On the main page of RNAtango, users can select one of three scenarios to
        analyze torsion angles. Each scenario provides an individual panel for
        data loading. By clicking a button, it is possible to switch between
        different scenarios. By default, the first scenario, “Single Model,” is
        displayed.`}
        <br />
        <br />
        {` Initiating a new task involves loading a single data file containing the
        atomic coordinates of a nucleic acid molecule, setting input parameters
        (optional), and defining the necessary settings. The system accepts
        input files in PDB and mmCIF formats, which can be uploaded from a
        designated location (such as a local drive) or directly from the Protein
        Data Bank (Berman et al., 2000). In the latter case, it is only
        necessary to provide the PDB ID of the structure, and the system will
        download it automatically. New users of RNAtango may also utilize the
        available examples to become familiar with the system s functionality.`}
      </p>
      <h6>1.1.1. Single model</h6>
      <p>
        {`This scenario enables the analysis of a single model to compute torsion
        angles for each residue. Additionally, users receive visually friendly
        statistical summaries to enhance their understanding of the torsion
        angle data.`}
      </p>
      <Image
        alt={"help_select_scenarios"}
        style={{
          width: "100%",
        }}
        width={800}
        src={help_select_scenarios.src}
      />
      <p>
        {`The available examples are sourced from the Protein Data Bank. By
        selecting one of these examples, the system automatically populates the
        PDB ID into the input field. Users also have the option to manually
        enter a PDB ID or upload a file from their local drive (2). Once the
        data has been successfully loaded, the “Upload” button will become
        enabled (3).`}
      </p>
      <Image
        alt={"help_add_chains"}
        style={{
          width: "100%",
        }}
        width={800}
        src={help_add_chains.src}
      />
      <p>
        {`After successfully loading the data, users can access the details for
        the model. It is possible define the task by select a model (by default
        model "1" is selected) and one or more chain(s) (1). For each chain, the
        entire range of nucleotides is displayed. Users can choose to analyze
        the full chain or a fragment of it (with the entire chain selected by
        default). The fragment can be selected in two ways: by entering the
        start and end numbers in the input fields (4a), or by clicking on the
        start and end points of the chain (4b). The panel includes buttons to
        select all chains, remove selections, or remove a chain (3). Users can
        add new same chains and separately select two different fragments.
        Please note that if no chain is selected, obtaining results will not be
        possible. Upon clicking Submit (5), the user will be redirected to the
        results page.`}
      </p>
      <h6>1.1.2. Models(s) vs Target </h6>
      <p>
        {`This scenario enables analysis and comparison between the target and
        models. In the initial step, it is essential to define a target, which
        can be done similarly to the first scenario by either uploading a file
        or using a PDB ID (2).`}
      </p>
      <Image
        alt={"help_select_target"}
        style={{
          width: "100%",
        }}
        width={800}
        src={help_select_target.src}
      />
      <p>
        {`In the second scenario, examples are prepared by loading files from the
        server that include both the target and models and redirected to another
        page (1). These files are sourced from RNApuzzles.`}
      </p>
      <Table
        dataSource={RNApuzzles}
        columns={columns}
        size={"small"}
        pagination={false}
      />
      <p>
        {`Similar to the first scenario, after loading the target, users can
        specify whether they want to analyze a fragment or the entire chain.
        However, in this case, it is only possible to select one chain, and the
        fragment must be continuous. Otherwise, a message indicating
        discontinuity will be displayed.`}
      </p>
      <Image
        alt={"help_add_models"}
        style={{
          width: "100%",
        }}
        width={800}
        src={help_add_models.src}
      />
      <p>
        {`In the table, the uploaded models are displayed. It is possible to
        modify this set by adding (1) new models or deleting existing ones (2).
        If a new model does not share any common elements with the existing
        ones, the upload process will fail, and an error message will be
        provided. By default, all torsion angles are selected (3). However, this
        selection can be adjusted, and unselected angles will not be included in
        the MCQ computation.
        <br />
        Additionally, the MCQ threshold can be adjusted from 0 to 180 degrees.
        Once at least one model has been uploaded and at least one angle has
        been selected, the Submit button will become available for use (3).`}
      </p>
      <h6>1.1.3. Model vs Model</h6>
      <p>
        {`This scenario closely resembles the second scenario; however, it extends
        the comparison by evaluating models against one another in addition to
        comparing each model to the target. This panel includes three examples.
        Upon selecting one of these example buttons, the corresponding model
        will be loaded. Users can also upload their own models; however, data
        loading from the Protein Data Bank is not available in this scenario.`}
      </p>
      <h5>1.2. Results of data processing</h5>
      <p>
        {`Once the task is initiated, the system opens a results page that
        displays the status of the task (Task uploaded, Queueing, Processing,
        Task completed). The page is assigned a unique URL, with the suffix
        being the task identifier. This identifier is also displayed in the
        header line on the results page. Upon completion of the calculation, the
        page will either show a message indicating the failure to complete the
        task or, if successful, display the data hierarchically in a top-down
        order. In each scenario, a task ID is provided along with the results.
        The results are stored in the database for one week before being
        deleted. During this period, it is possible to return to the results
        page.`}
      </p>
      <Image
        alt={"help_steps"}
        style={{
          width: "100%",
        }}
        width={800}
        src={help_steps.src}
      />
      <h6>1.2.1 Single Model</h6>
      <p>
        {`On the results page, users are presented with tables where each table
        represents a continuous fragment of a chain. Users can expand or
        collapse these tables to access the data. The columns in each table
        correspond to the torsion angles for each residue. Users have the option
        to select or deselect individual rows or columns. When downloading a CSV
        file, only the data corresponding to the selected rows and columns will
        be saved. For each torsion angle, a histogram is generated to illustrate
        the distribution of angles within specific ranges (each range spanning
        15 degrees). This histogram can be downloaded in SVG format. At the
        bottom of the results page, a bar plot displaying statistics for the chi
        and P angles is provided.`}
      </p>
      <h6>1.2.2 Model(s) vs Target</h6>
      <p>
        {`Upon successful completion of the computation, users will receive the
        analysis and can select which model to display using a selection field.
        The results page provides a comparison of MCQ values between models in
        the form of a table and a heatmap. Users can obtain more specific
        information for each model, including angular parameters. Additionally,
        secondary structures are colored based on MCQ values, and a 3D
        visualization is available through Mol*.`}
      </p>
      <Image
        alt={"help_heatmap"}
        style={{
          width: "100%",
        }}
        width={800}
        src={help_heatmap.src}
      />

      <p>{`Users can interact with the heatmap by clicking to change the type of visual map between a continuous range from 0 to 180 degrees or discrete ranges of 0-15, 15-30, 30-60, and >60 degrees (1). The heatmap can be zoomed in and out using a slider (3a) or by scrolling (3b). Additionally, users have the ability to change the range of displayed elements (4) and download the heatmap as an SVG file (2).`}</p>
      <Image
        alt={"help_molstar"}
        style={{
          width: "100%",
        }}
        width={800}
        src={help_molstar.src}
      />
      <p>
        {`This selection allows users to focus on a particular model for detailed
        analysis. The visualization will highlight the common fragments among
        the selected models, emphasizing regions of interest. This feature helps
        in understanding shared structural elements and their significance.`}
      </p>
      <h6>1.2.3. Model vs Model</h6>
      <p>
        {`On the results page, there is a table comparing each model with others
        using two measures: LCS (Longest Common Subsequence) and MCQ (Mean of
        Circular Quantities). Additionally, all models are represented in a
        dendrogram and a scatter plot. The functionality to adjust the number of
        clusters is also available (1).`}
      </p>
      <Image
        alt={"help_scatter"}
        style={{
          width: "100%",
        }}
        width={800}
        src={help_scatter.src}
      />
      <Image
        alt={"help_model_matrix"}
        style={{
          width: "100%",
        }}
        width={800}
        src={help_model_matrix.src}
      />
      <p>
        {`This scenario enables the selection of one structure to serve as the
        target. Subsequently, the entire configuration of the second scenario
        will be displayed for this selected target.`}
      </p>
    </div>
  );
};

export default Help;
