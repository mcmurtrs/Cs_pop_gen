
USETEXTLINKS = 1
STARTALLOPEN = 0
WRAPTEXT = 1
PRESERVESTATE = 0
HIGHLIGHT = 1
ICONPATH = 'file:///C:/Users/shawn/Downloads/WinArl35/WinArl35/'    //change if the gif's folder is a subfolder, for example: 'images/'

foldersTree = gFld("<i>ARLEQUIN RESULTS (output.arp)</i>", "")
insDoc(foldersTree, gLnk("R", "Arlequin log file", "Arlequin_log.txt"))
	aux1 = insFld(foldersTree, gFld("Run of 06/10/22 at 17:43:08", "output.xml#06_10_22at17_43_08"))
	insDoc(aux1, gLnk("R", "Settings", "output.xml#06_10_22at17_43_08_run_information"))
		aux2 = insFld(aux1, gFld("Genetic structure (samp=pop)", "output.xml#06_10_22at17_43_08_pop_gen_struct"))
		insDoc(aux2, gLnk("R", "Pairwise distances", "output.xml#06_10_22at17_43_08_pop_pairw_diff"))
		insDoc(aux2, gLnk("R", "Locus by locus AMOVA", "output.xml#06_10_22at17_43_08pop_Loc_by_Loc_AMOVA"))
		insDoc(aux2, gLnk("R", "F-stat bootstraps", "output.xml#06_10_22at17_43_08_comp_sum_bootstrap"))
