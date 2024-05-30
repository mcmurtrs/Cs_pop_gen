# Finalized VCF files are found in this directory:

```
/nfs4/BPP/Anderson_LeBoldus/LeBoldus/mcmurtrs/VCF
```

# Directory Index:

- VCF file containing all 90 samples (85 C. sulphurascens and 5 C. weirii): `C_sulph_C_weirii_FINAL.vcf.gz`
- 

# Helpful commands:

## List all the isolates contained within VCF file: ` bcftools query -l FINAL.vcf.gz `

## List number of SNPs in vcf file: ` bcftools view -H FINAL.vcf.gz | wc -l `

## Rename an isolate in a vcf file:
