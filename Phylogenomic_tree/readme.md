# Working directory:

` /nfs1/BPP/LeBoldus_Lab/user_folders/mcmurtrs/cs_align/5_Step_5_Genotyping_Reads/FINAL_CS_ONLY_TREE/FINAL_FINAL_TREE/NO_MORE `

# FILES USED:

## VCF:
- FINAL_E1.vcf.gz

## Fasta:
- FINAL_E1-.min4.fasta

# Variants:

` bcftools view -H FINAL_E1.vcf.gz | wc -l `
44444


# J-model test:

` /nfs1/BPP/LeBoldus_Lab/user_folders/mcmurtrs/bin/modeltest-ng-static -i FINAL_E1-.min4.fasta -d nt -p 120`

![image](https://user-images.githubusercontent.com/49656044/193315053-7edea39b-d231-4629-ab03-24258338c564.png)

# Start tree:

` SGE_Batch -q bpp@symbiosis -c '/nfs1/BPP/LeBoldus_Lab/user_folders/mcmurtrs/bin/raxml-ng --msa FINAL_E1-.min4.fasta -model TVM+G4 --prefix T1 --threads 20' -r T1 -P 20 `

# Bootstrapping x 1000:

` SGE_Batch -q bpp@symbiosis -c '/nfs1/BPP/LeBoldus_Lab/user_folders/mcmurtrs/bin/raxml-ng --bootstrap --msa T1.raxml.rba --model TVM+G4 --prefix T2 --threads 20 --bs-tree 1000' -r T2 -P 20 `


# Check convergence:


` /nfs1/BPP/LeBoldus_Lab/user_folders/mcmurtrs/bin/raxml-ng --bsconverge --bs-trees T2.raxml.bootstraps --prefix Test --threads 2 --bs-cutoff 0.03 `

![image](https://user-images.githubusercontent.com/49656044/193498648-c9c806f4-1eea-4042-8e96-95c2ef5215bb.png)

# Map Support values from Bootstrap test to best scoring ML tree

` /nfs1/BPP/LeBoldus_Lab/user_folders/mcmurtrs/bin/raxml-ng --support --tree T1.raxml.bestTree --bs-trees T2.raxml.bootstraps --prefix T3 --threads 2 `


