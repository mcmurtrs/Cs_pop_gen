# Working directory:

` /nfs1/BPP/LeBoldus_Lab/user_folders/mcmurtrs/cs_align/5_Step_5_Genotyping_Reads/FINAL_CS_ONLY_TREE/FINAL_FINAL_TREE/NO_MORE `

# FILES USED:

## VCF:
- FINAL_E1.vcf.gz

## Fasta:
- FINAL_E1-.min4.fasta

# J-model test:

` /nfs1/BPP/LeBoldus_Lab/user_folders/mcmurtrs/bin/modeltest-ng-static -i FINAL_E1-.min4.fasta -d nt -p 120`

![image](https://user-images.githubusercontent.com/49656044/193315053-7edea39b-d231-4629-ab03-24258338c564.png)

# Start tree:

` SGE_Batch -q bpp@symbiosis -c '/nfs1/BPP/LeBoldus_Lab/user_folders/mcmurtrs/bin/raxml-ng --msa FINAL_E1-.min4.fasta -model TVM+G4 --prefix T1 --threads 20' -r T1 -P 20 `
