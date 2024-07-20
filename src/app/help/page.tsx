"use client";
import styles from "./page.module.css";

const Help = () => {
  return (
    <div className={styles.scenario}>
      <h1>Help</h1>
      <div>
        <h5>1.1. Homepage and input data</h5>
        <p>
          On the main page of RNAtango, users can select one of three scenarios
          to analyze torsion angles. Each scenario provides an individual panel
          for data loading.
        </p>
        <br />
        <p>
          By clicking a button, it is possible to switch between different
          scenarios. By default, the first scenario, “Single Model,” is
          displayed. Initiating a new task involves loading a single data file
          containing the atomic coordinates of a nucleic acid molecule, setting
          input parameters (optional), and defining the necessary settings. The
          system accepts input files in PDB and mmCIF formats, which can be
          uploaded from a designated location (such as a local drive) or
          directly from the Protein Data Bank (Berman et al., 2000). In the
          latter case, it is only necessary to provide the PDB ID of the
          structure, and the system will download it automatically. New users of
          RNAtango may also utilize the available examples to become familiar
          with the system s functionality.
        </p>
        <h6>1.1.1. Single model</h6>
        <p>
          The available examples are sourced from the Protein Data Bank. By
          selecting one of these examples, the system automatically populates
          the PDB ID into the input field. Once the data has been successfully
          loaded, the “Upload” button will become enabled.
        </p>
        <br />
        <p>
          In this panel, it is possible to define the task by selecting the
          model, chain(s), and fragment. The default settings can be modified by
          interacting with the panel. Please note that if no chain is selected,
          obtaining results will not be possible. Upon clicking Submit, the user
          will be redirected to the results page.
        </p>
        <br />
        <p>
          In each scenario, a task ID is provided along with the results. The
          results are stored in the database for one week before being deleted.
          During this period, it is possible to return to the results page.
        </p>
        <br />
        <p>
          The following steps display the current status of the processing task.
        </p>
        <h6>1.1.2. Models(s) vs Target </h6>
        <p>
          This scenario enables analysis and comparison between the target and
          models. In the initial step, it is essential to define a target, which
          can be done similarly to the first scenario by either uploading a file
          or using a PDB ID. By selecting the prepared example collection, the
          user will be redirected to a separate page where the target and models
          will be pre-loaded.
        </p>
        <br />
        <p>
          In the table, the uploaded models are displayed. It is possible to
          modify this set by adding new models or deleting existing ones. If a
          new model does not share any common elements with the existing ones,
          the upload process will fail, and an error message will be provided.
          By default, all torsion angles are selected. However, this selection
          can be adjusted, and unselected angles will not be included in the MCQ
          computation.
          <br />
          Additionally, the MCQ threshold can be adjusted from 0 to 180 degrees.
          Once at least one model has been uploaded and at least one angle has
          been selected, the Submit button will become available for use.
        </p>
        <h6>1.1.3. Model vs Model</h6>
        <p>
          This scenario closely resembles the second scenario; however, it
          extends the comparison by evaluating models against one another in
          addition to comparing each model to the target. This panel includes
          three examples. Upon selecting one of these example buttons, the
          corresponding model will be loaded. Users can also upload their own
          models; however, data loading from the Protein Data Bank is not
          available in this scenario.
        </p>
        <h5>1.2. Results of data processing</h5>
        <p>
          In each scenario, a task ID is provided along with the results. The
          results are stored in the database for one week before being deleted.
          During this period, it is possible to return to the results page. The
          following steps display the current status of the processing task.
        </p>
        <h6>1.2.1 Single Model</h6>
        <p>
          On the results page, users are presented with tables where each table
          represents a continuous fragment of a chain. Users can expand or
          collapse these tables to access the data. The columns in each table
          correspond to the torsion angles for each residue. Users have the
          option to select or deselect individual rows or columns. When
          downloading a CSV file, only the data corresponding to the selected
          rows and columns will be saved. For each torsion angle, a histogram is
          generated to illustrate the distribution of angles within specific
          ranges (each range spanning 15 degrees). This histogram can be
          downloaded in SVG format. At the bottom of the results page, a bar
          plot displaying statistics for the chi and phi angles is provided.
        </p>
      </div>
    </div>
  );
};

export default Help;
