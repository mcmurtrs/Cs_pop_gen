

# Mat 915-11......... 74.7% complete

![image](https://github.com/mcmurtrs/Cs_pop_gen/assets/49656044/f09e859f-2b76-4bc2-971d-ce5357893789)

# MAT366-2......... 70.7% complete

![image](https://github.com/mcmurtrs/Cs_pop_gen/assets/49656044/4fd305d0-55ce-4af5-a858-3e83a2da61ab)

# Mat20-4......... 72.8% complete

![image](https://github.com/mcmurtrs/Cs_pop_gen/assets/49656044/d97cd89d-aca8-4923-96ee-767bd0e0e32c)

# MAT-763........... 76.6% complete

![image](https://github.com/mcmurtrs/Cs_pop_gen/assets/49656044/ef1baec1-a97f-4d31-8f76-8b7228b1019b)

# MAT91_10_3....... 76.1% complete

![image](https://github.com/mcmurtrs/Cs_pop_gen/assets/49656044/b635158c-1c4e-4bfb-887b-6b20b1c068f5)

# MAT91_1_13....... 67.0% complete

![image](https://github.com/mcmurtrs/Cs_pop_gen/assets/49656044/d7d6fd67-1752-4917-b99e-96047cf0fb26)

# MAT91_1_12........... 73.2% complete

![image](https://github.com/mcmurtrs/Cs_pop_gen/assets/49656044/a3b1514b-93cb-49a3-9865-441063810989)


# MAT91_7_2........... 96.3% complete

![image](https://github.com/mcmurtrs/Cs_pop_gen/assets/49656044/5268fc48-c418-4c6b-84f5-686e4c542b38)


# MAT91_1_11......... 76.7% complete

![image](https://github.com/mcmurtrs/Cs_pop_gen/assets/49656044/25035513-59c0-4948-aa29-95d4091fddc2)


# MAT911021......... 86.4% complete

![image](https://github.com/mcmurtrs/Cs_pop_gen/assets/49656044/52578e48-b6fa-456c-86e0-cc0207ce2727)


# Subsamples of larger fasta files

# BRIG
# Change this value before doing final analysis!!!!
![image](https://github.com/mcmurtrs/Cs_pop_gen/assets/49656044/ce61f03b-babf-44e7-8e1e-b3e231a7c64d)


## REFERENCE

### Directory

```/nfs4/BPP/Anderson_LeBoldus/LeBoldus/mcmurtrs/REFERENCE```
## Print first 1,700 lines into a new file

``` ( head -1700 GCA_002794785.1_PSUO.v3_genomic.fna > GCA_002794785_First_1700.fasta )
 ```
## Directory

``` /nfs4/BPP/Anderson_LeBoldus/LeBoldus/mcmurtrs/De_novo/Mat915-11_Ass ```

## Print first 1,700 lines into a new file

``` ( head -1700 Mat915-11.spades_COPY.fasta > Mat915-11_First_1700.fasta )  ```

## Directory

```/nfs4/BPP/Anderson_LeBoldus/LeBoldus/mcmurtrs/De_novo/MAT366-2_Ass```


## Print first 1,700 lines into a new file

``` ( head -1700 MAT366-2_COPY.spades.fasta > MAT366-2_Firstst_1700.fasta )  ```

# MAFFT
```
cat Mat915-11.spades.fasta Mat20-4.spades.fasta MAT366-2.spades.fasta MAT-763.spades.fasta MAT91_10_3.spades.fasta MAT91_1_11.spades.fasta MAT91_1_12.spades.fasta MAT91_1_13.spades.fasta MAT91_7_2.spades.fasta > ALL.fasta


## pwd
/nfs4/BPP/Anderson_LeBoldus/LeBoldus/mcmurtrs/MATLOCK/1700

## cat
cat MAT366-2_Firstst_1700.fasta Mat915-11_First_1700.fasta > 1700.fasta

SGE_Batch -c "/local/cluster/mafft-7.487/mafft 1700.fasta > 1700.msa" -P 20 -r MSA_1700

SGE_Batch -c "/local/cluster/mafft-7.487/mafft ALL.fasta > ALL.msa" -P 20 -r MATLOCK_GENOMES_MSA

```

# With the use of BUSCO I was able to determine that the following three protein sequences are found in all Matlock samples except for sample Mat 915-11.

## 26369at5204
```
>NODE_520_length_15891_cov_28.048754:360-2330
MSAAPVPPPPHLPSSSASFHPLHMLFFCEECDAVRCNRCVAIEVSGYYCPNCLFEVPSAS
VRAERNRCARNCFQCPHCRNTLSVVPSDPPDEDALSSSSQAGTMGEPPFLLYCNNCRWDS
AEVGTTFEKPTGLARKLQRFEDSAPEFLEFERLKDFFEPLLRAAPSASHTPSASSHSAHV
NALTAAASSALARDIPGVGKHNPSLRSGRANRARHGSKDDLPVYRARVEVSGASGLGAGG
SGDAELMRHLETPADVSKLEQRWSGSWAESLRELKPIRIPLHSRLTKRCPACRHILIKPE
QKAQSVRYKIKLVAANYMPAISVSLPSTQPGTSAAGRKSLSAAAQKGGDDEGTAGRTPML
AGKTYPFQLALTNPLYDPIQVRLAVQRQQLPAAPNTDDSAADGTTKARRPTFAVSLPTSA
FSVAAFAEAWEYEDDDEEMFGLDDDVGGADGLLGRSGAGTGAGASPTKERAGRGKAKTVG
VLEKKANTTVVGGEVVIGRDGRGDVKFNMLISYTYRSDEPQDEDGGGDRDRDARANTRTG
AGGGAGAAKNVPETKTFSFYTVVSLGTIVPRE
```

![image](https://github.com/mcmurtrs/Cs_pop_gen/assets/49656044/45cfaf10-9e81-45bc-b42b-ad9fdfae332f)


## 77827at5204
```
>NODE_1117_length_7542_cov_28.699933:1318-1985
MPWPPVTPVFAAGQEPLPPGMTEADRVQLNEARKYEEYMKMGSESCVAKTVLAGVGGLAI
GAFFSLMSSSFAYEDPLLRPQSQTNLNTTQKAREIFKEMGKGMWRSGKGFGKVGALFAGL
ECAVESYRAKNDMVNPVLAGFMAGGILARNSGPKAALGGGAAFAAFSAAIDLFLRRESSE
```

![image](https://github.com/mcmurtrs/Cs_pop_gen/assets/49656044/fe8c0589-8bca-4333-b36a-9667cb1ac9b2)


## 79371at5204
```
>NODE_1690_length_4837_cov_24.988866:121-851
MFGCVVAGRLIQTNLQQVDETHAIFELQSASTINHICVFLLGTVPFPDGYGATVHFHWPG
KGFQLLGALSNDKPSAIFRLRGAFSTQPSLAHAAFQAPGANAPSDGDANAILGISVEPFA
AIQAQLATLPSAVARPAAPAEPTVLAEKIVKHLFNFLSSFAADGTTGVGLTPDSYVQMRA
VTRWYESFMSKIRAGGAGFLDRQE


```

![image](https://github.com/mcmurtrs/Cs_pop_gen/assets/49656044/ff94fe1d-5c89-4f19-957e-17393d943778)

