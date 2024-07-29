"use client";
import { Image } from "antd";
import styles from "./page.module.css";
import help_select_scenarios from "../../assets/help/help_select_scenarios.png";
import help_add_chains from "../../assets/help/help_add_chains.png";
import help_select_target from "../../assets/help/help_select_target.png";
import help_add_models from "../../assets/help/help_add_models.png";
import help_steps from "../../assets/help/help_steps.png";
import help_molstar from "../../assets/help/help_molstar.png";
import help_scatter from "../../assets/help/help_scatter.png";
import help_heatmap from "../../assets/help/help_heatmap.png";
import help_heatmap_range from "../../assets/help/help_heatmap_range.png";
import help_model_matrix from "../../assets/help/help_model_matrix.png";
import chrome from "../../assets/help/Google_Chrome_icon_(September_2014).png";
import firefox from "../../assets/help/640px-Firefox_logo.png";
import safari from "../../assets/help/234px-Safari_browser_logo.png";
import equation_diff from "../../assets/help/equation_diff.svg";
import equation_mcq from "../../assets/help/equation_mcq.svg";
import equation_modulo from "../../assets/help/equation_modulo.svg";
import equation_range from "../../assets/help/equation_range.svg";
import equation from "../../assets/help/equation.svg";
import { Suspense } from "react";
import TableOfContent from "./TableOfContent";
import TableTorsionAngles from "./TableTorsionAngles";
import TableTorsionAnglesPseudo from "./TableTorsionAnglesPseudo";
import TableFiles from "./TableFiles";

const Help = () => {
  return (
    <div className={styles.scenario}>
      <h1>Help</h1>
      <Suspense>
        <TableOfContent />
      </Suspense>
      <p>
        {`RNAtango is a comprehensive platform for analyzing torsion and pseudotorsion angles in nucleic acid structures. The system calculates angular parameters from atomic coordinates, enabling detailed analysis, evaluation, and comparison in three usage scenarios. These scenarios cater to various analytical needs, ranging from studying a single model to comparing torsion angles across multiple models and assessing their similarities.`}
      </p>
      <h5 id={"home_paragraph"}>1. Homepage and input data</h5>
      <p>
        {`On the RNAtango main page, users can select from three usage scenarios, each offering an individual panel for data upload. Switching between scenarios is possible by clicking the respective buttons, with the first scenario, `}
        <i>Single Model</i>
        {` 
        displayed by default.`}
        <br />
        <br />
        {` Initiating a new task involves loading a single data file containing the atomic coordinates of a nucleic acid molecule, setting input parameters (optional), and defining the necessary settings. The system accepts input files in PDB and mmCIF formats, which can be uploaded from a designated location (such as a local drive) or directly from the `}
        <a
          style={{ color: "#04afa4" }}
          href="https://github.com/tzok/mcq4structures"
        >
          Protein Data Bank
        </a>
        {` (Berman et al., 2000). In the latter case, it is only necessary to provide the PDB ID, and the system will automatically download the corresponding structure. New users of RNAtango can also utilize the available examples to become familiar with the system's functionality.`}
      </p>
      <h6 id={"single_model"}>1.1. Single model</h6>
      <p>
        {`This scenario allows users to upload a single structure and analyse its angular parameters, computed for every residue in the structure (or in its fragment, if the user decides to limit the analysis to a selected region. Users receive visually friendly
        statistical summaries to enhance their understanding of the angular data (torsion and pseudotorsion angles).`}
      </p>
      <Image
        alt={"help_select_scenarios"}
        style={{
          width: "100%",
        }}
        width={800}
        src={help_select_scenarios.src}
      />
      <small>
        Figure 1. Data upload page in the <i>Single model</i> scenario.
      </small>
      <p>
        {`The available examples are sourced from the Protein Data Bank. By
        selecting one of these examples, the system automatically populates the
        PDB ID into the input field. Users also have the option to manually
        enter a PDB ID or upload a file from their local drive. Once the
        data has been successfully loaded, the `}
        <i>Upload</i>
        {` button is enabled.`}
      </p>
      <Image
        alt={"help_add_chains"}
        style={{
          width: "100%",
        }}
        width={800}
        src={help_add_chains.src}
      />
      <small>
        Figure 2. Data specification page in the <i>Single model</i> scenario.
      </small>
      <p>
        {`After successfully loading the data, users can select a model (with model `}
        <i>1</i>
        {` selected by default) and then choose one or more chains. For each chain, the
        entire range of nucleotides is displayed. Users can choose to analyze
        the full chain or a fragment of it (with the entire chain selected by
        default). The fragment can be selected in two ways: by entering the
        start and end numbers in the input fields, or by clicking on the
        start and end points of the chain. The panel includes buttons to
        select all chains, remove selections, or remove a chain. Users can add an additional instance of the same chain and select a different fragment of interest.
        Please note that if no chain is selected, results cannot be obtained.
        Upon clicking `}
        <i>Submit</i>
        {`, the user will be redirected to the
        result page.`}
      </p>
      <h6 id={"models_vs_target"}>1.2. Model(s) vs Target </h6>
      <p>
        {`This scenario enables analysis and comparison between the target and
        models. In the initial step, it is essential to define a target, which
        can be done similarly to the first scenario by either uploading a file
        or providing a PDB ID.`}
      </p>
      <Image
        alt={"help_select_target"}
        style={{
          width: "100%",
        }}
        width={800}
        src={help_select_target.src}
      />
      <small>
        Figure 3. Data upload page in the <i>Model(s) vs Target</i> scenario.
      </small>
      <p>
        {`Examples in the second scenario include both the target and models,
        sourced from RNA-Puzzles.`}
      </p>
      {/* <Table
        dataSource={RNApuzzles}
        columns={columns}
        size={"small"}
        pagination={false}
      /> */}
      <TableFiles />
      <p>
        {`Similar to the first scenario, after loading the target, users can
        choose to analyze either a fragment or the entire chain.
        However, in this scenario, only one chain can be selected, and the
        fragment must be continuous. If the fragment is discontinuous,
        a message will be dislayed indicating this issue.`}
      </p>
      <Image
        alt={"help_add_models"}
        style={{
          width: "100%",
        }}
        width={800}
        src={help_add_models.src}
      />
      <small>
        Figure 4. Data specification page in the <i>Model(s) vs Target</i>{" "}
        scenario.
      </small>
      <p>
        {`The table displays the uploaded models with options to add new models
        or delete existing ones. If a new model does not share a common subsequence with the existing
        ones, the upload process fails, and an error message is shown. By default, all torsion angles are selected
        but this
        selection can be adjusted; unselected angles will be excluded from
        the MCQ computation.`}
        <br />
        {`
        Additionally, users can set the MCQ threshold between 0\u00B0 and 180\u00B0.
        The `}
        <i>Submit</i>
        {` button will become acive once at least one model
        has been uploaded and at least one angle has been selected.`}
      </p>
      <h6 id={"model_vs_model"}>1.3. Model vs Model</h6>
      <p>
        {`This scenario is similar to the previous onebut extends
        the comparison to include evaluations between models; every model can serve as a target.
        The panel provides three examples.
        Selecting one of them uploads the respective set of models.
        Users can also upload their own models, though data upload from the Protein Data Bank is not supported in this scenario.`}
      </p>
      <h5 id={"angular_measures"}>2. Angular measures in RNAtango</h5>
      <h6 style={{ marginTop: "20px" }} id={"torsion_angles"}>
        2.1. Torsion and pseudotorsion angles
      </h6>
      <p>
        {`RNA folds are characterized by several angular parameters. Six torsion
        angles, \u03B1, \u03B2, \u03B3, \u03B4, \u03B5, and \u03B6, describe a
        nucleotide backbone; the angle \u03C7 determines the glycosidic bond;
        five torsion angles, `}
        v<sub>0</sub>, v<sub>1</sub>, v<sub>2</sub>, v<sub>3</sub>, v
        <sub>4</sub>
        {`, describe the ribose component.
        The following table presents torsion angles along with the atoms, which
        are used to compute them:`}
      </p>
      <TableTorsionAngles />
      <p>
        {`The ribose ring adopts two primary conformations: the envelope form,
        where four atoms are coplanar and one is out of a plane, or the twist
        form, featuring three coplanar atoms with two adjacent atoms displaced
        on opposite sides of the plane. These conformations can be distinguished
        based on a single angular parameter, the pseudorotation phase angle P,
        which elegantly substitutes for the five highly correlated angles `}
        v<sub>0</sub> - v<sub>4</sub>
        {`. P , ranging from 0\u00B0 to 360\u00B0, precisely represents the
        envelope or twist modes, offering a concise yet comprehensive
        description of the ribose geometry:`}
      </p>
      <Image
        alt={"math_formula"}
        style={{
          width: "100%",
        }}
        width={300}
        src={equation.src}
      />
      <small>Figure 5.</small>
      <p>
        {`RNA structure analysis utilizes also pseudo-torsion angles, defined
        between non-bonded atoms. These angles, \u03B7, \u03B8, \u03B7', and \u03B8', are
        effectively used to describe RNA folding by providing a coarse-grained
        picture of RNA backbone shape.`}
      </p>
      <TableTorsionAnglesPseudo />
      <h6 style={{ marginTop: "20px" }} id={"mcq"}>
        2.2. MCQ
      </h6>
      <p>
        {`MCQ (Mean of Circular Quantites) has been proposed to compare RNA 3D structures given in trigonometric representation, which means that the comparison is based on angular parameters instead of atom coordinates (`}
        <a
          style={{ color: "#04afa4" }}
          href="https://link.springer.com/article/10.1007/s10100-013-0296-5"
        >
          Zok et al., 2014
        </a>
        {`). It is a distance measure, thus, the smaller its value, the more similar the compared structures are (the smaller the distance between them). 
Given two structures `}
        (S<sub>T</sub> and S{`'`}
        <sub>T</sub>)
        {` in trigonometric representation, one has to deal with circular quantities with the period of 2\u03c0. This implies a necessity to define the difference, diff(t, t'), between two circular quantities, t and t ', which can be either directed or undirected. In the first case, subtraction of values is not commutative, meaning one must differentiate between a minuend and a subtrahend value. Since we cannot determine this in the case of structure comparison, the undirected difference is used:`}
      </p>
      <Image
        alt={"math_formula_diff"}
        style={{
          width: "100%",
        }}
        width={250}
        src={equation_diff.src}
      />
      <p style={{ width: "100%" }}>where</p>
      <Image
        alt={"math_formula_modulo"}
        style={{
          width: "100%",
        }}
        width={250}
        src={equation_modulo.src}
      />
      <p
        style={{ width: "100%" }}
      >{`Based on these formulas, we define the distance, \u0394(t,t'), between two angles, t and t':`}</p>
      <Image
        alt={"math_formula_delta"}
        style={{
          width: "100%",
        }}
        width={600}
        src={equation_range.src}
      />
      <p>
        {`The overall distance MCQ`}(S<sub>T</sub>, S{`'`}
        <sub>T</sub>){` between structures `}S<sub>T</sub> and S{`'`}
        <sub>T</sub>
        {` given in the trigonometric representation, results from applying the following formula for the mean of structural quantities:`}
      </p>
      <Image
        alt={"math_formula_mcq"}
        style={{
          width: "100%",
        }}
        width={600}
        src={equation_mcq.src}
      />
      <p>
        {`where r is the number of residues in S \u2229 S' and T is a set of torsion
        angles.`}{" "}
        <br />
        <br />{" "}
        {`To compute MCQ, one can use the MCQ4Structures algorithm. The
        algorithm is available as a Java application and can be downloaded from `}
        <a
          style={{ color: "#04afa4" }}
          href="https://github.com/tzok/mcq4structures"
        >
          GitHub
        </a>
        {`. It is also incorporated into the RNAtango computational engine.`}
      </p>
      <h6 id={"lcs_ta"}>2.3. LCS-TA</h6>
      <p>
        {`LCS-TA (Longest Continuous Segment in Torsion Angle space) has been
        designed as a similarity measure, thus, the larger its value, the more
        similar the compared structures are (`}
        <a
          style={{ color: "#04afa4" }}
          href="https://bmcbioinformatics.biomedcentral.com/articles/10.1186/s12859-017-1867-6"
        >
          Wiedemann et al., 2017
        </a>
        {`). LCS-TA
        compares two RNA 3D structures, S and S', and identifies similar
        fragments within them. The similarity of fragments is defined as the MCQ
        value below a threshold defined by the user. LCS-TA operates in the
        space of torsion angles, so it is superposition-independent and does not
        involve finding the optimum alignment of structures. The method scans
        both structures stepwise along their backbones and uses a moving search
        window to select segments for comparison. In this routine, a divide and
        conquer formula is followed to determine the window size in each step.
        For a pair of window-highlighted segments, LCS-TA computes MCQ value
        over a set of torsion angles related to the segments. Next, it checks
        whether the MCQ value is below the threshold. At the output, LCS-TA
        provides the length of the longest continuous segment satisfying
        similarity condition (i.e., fitting below the threshold) and segment
        location (its first and last residue numbers). The resulting segment's
        length (referred to as LCS) is the measure of local similarity. The
        LCS-TA algorithm is available as a Java application and can be
        downloaded from `}
        <a
          style={{ color: "#04afa4" }}
          href="https://github.com/tzok/mcq4structures"
        >
          GitHub
        </a>
        {`. It is also incorporated into the RNAtango
        computational engine.`}
      </p>
      <h5 id={"result_of_data_processing"}>3. Results of data processing</h5>
      <p>
        {`Once a task is initiated, the system directs users to a result page that
        displays the task status (Task uploaded, Queueing, Processing,
        Task completed). Each result page is assigned a unique URL, with the suffix
        being the task identifier, which is also displayed in the
        header of the result page. Upon completion, the
        page will either indicate a failure to complete the
        task or, if successful, present the data hierarchically from top to bottom.
        Each scenario provides a task ID along with the results.
        Results are stored in the database for one week before being
        deleted, during which time users can revisit the result
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
      <small>
        Figure 5. Status bar showing the current status of the task being
        processed.
      </small>
      <h6 style={{ marginTop: "20px" }} id={"single_model_result"}>
        3.1. Single Model
      </h6>
      <p>
        {`On the result page, users are presented with tables where each table
        represents a continuous fragment of a chain. These tables can be expanded or collapsed 
        to view the data. The columns 
        correspond to the torsion angles for each residue. Users can
        to select or deselect individual rows or columns. When downloading a CSV
        file, only the data from the selected rows and columns will
        be saved. For each torsion angle, a histogram is generated to show
        the distribution within specific ranges (each range spanning
        15\u00B0). This histogram can be downloaded in SVG format. At the
        bottom of the result page, a bar plot displays statistics for the Chi
        and P angles.`}
      </p>
      <h6 id={"models_vs_target_result"}>3.2. Model(s) vs Target</h6>
      <p>
        {`Upon successful completion of the computation, users will receive the
        analysis and can choose which model to display using a selection field.
        The result page presents a comparison of MCQ values between models in
        both the table and a heatmap formats. Users can access detailed 
        information for each model, including angular parameters. 
        Secondary structures are color-coded according to MCQ values, and a 3D
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
      <Image
        alt={"help_heatmap_range"}
        style={{
          width: "100%",
        }}
        width={800}
        src={help_heatmap_range.src}
      />
      <small>
        {`Figure 6. Heatmap with residue-wise MCQ values for the processed models
        colored according to (top) a continuous scale (0\u00B0 - 180\u00B0) and (bottom)
        discrete ranges (0\u00B0-15\u00B0, 15\u00B0-30\u00B0, 30\u00B0-60\u00B0, and >60\u00B0).`}
      </small>
      <p>{`Users can interact with the heatmap by clicking to switch between 
      a continuous range from 0\u00B0 to 180\u00B0 (Figure 6. top) and discrete 
      ranges of 0\u00B0-15\u00B0, 15\u00B0-30\u00B0, 30\u00B0-60\u00B0, and >60\u00B0 (Figure 6. bottom). The heatmap can be zoomed in or out using a slider or by scrolling. Additionally, users can adjust the range of displayed elements and download the heatmap as an SVG file.`}</p>
      <Image
        alt={"help_molstar"}
        style={{
          width: "100%",
        }}
        width={800}
        src={help_molstar.src}
      />
      <small>
        Figure 7. Alignment of the longest continuous segments found by LCS-TA.
      </small>
      <p>
        {`This option allows users to focus on a specific model for detailed
        analysis. The visualization highlights the common fragments among
        selected models, emphasizing key regions of interest. This feature aids
        in understanding shared structural elements and their significance.`}
      </p>
      <h6 id={"model_vs_model_result"}>3.3. Model vs Model</h6>
      <p>
        {`On the result page, a table compares each model with others
        using two metrics: LCS-TA (Longest Continuous Segment in Torsion Angle space) and MCQ (Mean of
        Circular Quantities). Additionally, the models are visualized in a
        dendrogram and a scatter plot. Users can also adjust the number of
        clusters.`}
      </p>
      <Image
        alt={"help_scatter"}
        style={{
          width: "100%",
        }}
        width={800}
        src={help_scatter.src}
      />
      <small>
        Figure 8. Clusters resulting from model clustering in the Model vs Model
        scenario.
      </small>
      <Image
        alt={"help_model_matrix"}
        style={{
          width: "100%",
        }}
        width={800}
        src={help_model_matrix.src}
      />
      <small>
        Figure 9. Result table in the <i>Model vs Model</i> scenario.
      </small>
      <p>
        {`This scenario allows users to select a single structure as the target.
        The results are then displayed similarly to those in the  `}
        <i>Model(s) vs Target</i>
        {` scenario for the chosen target.`}
      </p>

      <h5 id={"system_requirements"}>4. System requirements</h5>
      <p style={{ width: "100%" }}>
        {`RNAtango is designed for desktop devices and is compatible with most 
         common web browsers. For optimal performance, using the latest versions 
         of these browsers is recommended.`}
      </p>
      <table style={{ border: "1px solid gray", textAlign: "center" }}>
        <tbody>
          <tr>
            <td width="75px">
              <a href="https://www.google.com/intl/en_en/chrome/">
                <img alt="chrome logo" width="55px" src={chrome.src} />
              </a>
            </td>
            <td width="75px">
              <a href="https://www.mozilla.org/en-US/firefox/new/">
                <img alt="firefox logo" width="64px" src={firefox.src} />
              </a>
            </td>
            <td width="75px">
              <a href="https://www.apple.com/safari/">
                <img alt="safari logo" width="64px" src={safari.src} />
              </a>
            </td>
          </tr>
          <tr style={{ height: "50px" }}>
            <td>
              <b>
                Chrome
                <br />
                126
              </b>
            </td>
            <td>
              <b>
                Firefox
                <br />
                128
              </b>
            </td>
            <td>
              <b>
                Safari
                <br />
                17.5
              </b>
            </td>
          </tr>
        </tbody>
      </table>

      <br />
    </div>
  );
};

export default Help;
