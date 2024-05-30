## Script 1: Copy reads from CGRB to LeBoldus Lab directory

### Illumina #1532, Completed 5/3/21
```cp -r /nfs2/hts/illumina/210430_J00107_0276_AHKNCYBBXY_1532/L2 /nfs4/BPP/Anderson_LeBoldus/LeBoldus/mcmurtrs/coniferiporia```
- FastQC Report: http://hts.cgrb.oregonstate.edu/illumina/210430_J00107_0276_AHKNCYBBXY_1532-L2/

### Illumina #1547, Completed 9/6/21
```cp -r /nfs2/hts/illumina/210902_J00107_0291_AHLL2WBBXY_1547/L2456 /nfs4/BPP/Anderson_LeBoldus/LeBoldus/mcmurtrs/coniferiporia```
- FastQC Report: http://hts.cgrb.oregonstate.edu/illumina/210902_J00107_0291_AHLL2WBBXY_1547-L2456/

### Illumina #1549, Completed 10/1/21
```cp -r /nfs2/hts/illumina/210927_J00107_0293_AHLLT7BBXY_1549/L1 /nfs4/BPP/Anderson_LeBoldus/LeBoldus/mcmurtrs/coniferiporia```
- FastQC Report: http://hts.cgrb.oregonstate.edu/illumina/210927_J00107_0293_AHLLT7BBXY_1549-L1

## Script 2: Create a list of the reads: make sure to type `bash` on the command line before using the following commands: 

``` 
bash

#Illumina 1532
for i in /nfs4/BPP/Anderson_LeBoldus/LeBoldus/mcmurtrs/coniferiporia/L2/lane*_R1_*; do a=$(basename $i| cut -f 7,8 -d "-"| cut -f 1 -d "_"); b=$(readlink -f $i); #c=$(readlink -f $i| sed 's/R1/R2/g'); printf ${a%%.*}";"$b";"$c"\n"; done > reads_list.txt

#Illumina 1547
for i in /nfs4/BPP/Anderson_LeBoldus/LeBoldus/mcmurtrs/coniferiporia/L2456/lane*_R1_*; do a=$(basename $i| cut -f 7,8 -d "-"| cut -f 1 -d "_"); b=$(readlink -f $i); c=$(readlink -f $i| sed 's/R1/R2/g'); printf ${a%%.*}";"$b";"$c"\n"; done > reads_list.txt


#Illumina 1549
for i in /nfs4/BPP/Anderson_LeBoldus/LeBoldus/mcmurtrs/coniferiporiaL1/lane*_R1_*; do a=$(basename $i| cut -f 7,8 -d "-"| cut -f 1 -d "_"); b=$(readlink -f $i); c=$(readlink -f $i| sed 's/R1/R2/g'); printf ${a%%.*}";"$b";"$c"\n"; done > reads_list.txt
```

## Script 3: Trim adapters with cutadapt (https://cutadapt.readthedocs.io/en/stable/)

### Adapters used for Illumina HiSeq 3000:

Read 1 AGATCGGAAGAGCACACGTCTGAACTCCAGTCA

Read 2 AGATCGGAAGAGCGTCGTGTAGGGAAAGAGTGT

### References: 
- Per Mark Dasenko, the adapters used for all Illumina runs are listed above and can be found on page 30 from the following document:
- https://github.com/LeBoldus-Lab/C.-sulphurascens-Project/blob/master/Illumina%20Sequencing/Step%201:%20QC%20of%20Reads/illumina-adapter-sequences-1000000002694-13.pdf


``` 
#!/bin/bash
#$ -N AdapterTrim
#$ -V
#$ -pe thread 8
#$ -cwd
#$ -S /bin/bash
#$ -l mem_free=128G
#$ -t 1-4:1
i=$(expr $SGE_TASK_ID - 1)
FILE=( `cat /nfs1/BPP/LeBoldus_Lab/user_folders/mcmurtrs/cs_align/reads_list.txt`)
IFS=';' read -r -a arr <<< "${FILE[$i]}"

R1_RAW=${arr[1]}
R2_RAW=${arr[2]}
R1_TRIM=${arr[0]}_1P.fastq.gz
R2_TRIM=${arr[0]}_2P.fastq.gz
CPU=8

#Trim Adapters
cutadapt -q 15,10 -a AGATCGGAAGAGCACACGTCTGAACTCCAGTCA -A AGATCGGAAGAGCGTCGTGTAGGGAAAGAGTGT -o $R1_TRIM -p $R2_TRIM $R1_RAW $R2_RAW
```

### Script 4: Trim low quality reads with Trimmomatic (http://www.usadellab.org/cms/uploads/supplementary/Trimmomatic/TrimmomaticManual_V0.32.pdf)
- Used Trimmomatic (version 0.32)
- For Trimmomatic the following parameters were used `LEADING:30 TRAILING:30 MINLEN of 25, and SLIDINGWINDOW:4:20`


### Trimmomatic References: 
 
- Bolger, A. M., Lohse, M., & Usadel, B. (2014). Trimmomatic: a flexible trimmer for Illumina sequence
data. Bioinformatics, 30(15), 2114-2120. doi:10.1093/bioinformatics/btu170
- Chung, Chia-Lin; Lee, Tracy J.; Akiba, Mitsuteru; Lee, Hsin-Han; Kuo, Tzu-Hao; Liu, Dang; Ke, Huei-Mien; Yokoi, Toshiro; Roa, Marylette B; Lu, Meiyeh J; Chang, Ya-Yun; Ann, Pao-Jen; Tsai, Jyh-Nong; Chen, Chien-Yu; Tzean, Shean-Shong; Ota, Yuko; Hattori, Tsutomu; Sahashi, Norio; Liou, Ruey-Fen; Kikuchi, Taisei; Tsai, Isheng J (2017). Comparative and population genomics landscape of <i>Phellinus noxius</i> : a hypervariable fungus causing root rot in trees. Molecular Ecology, (), –. doi:10.1111/mec.14359 

```
bash
for i in /nfs1/BPP/LeBoldus_Lab/user_folders/mcmurtrs/cs_align/1_Step_1_Trim_Adapters/Illumina_1547/*.fastq.gz*; do a=$(basename $i| cut -f 2,5 -d "/"| cut -f 1 -d "_"); b=$(readlink -f $i); c=$(readlink -f $i| sed 's/1P/2P/g'); printf ${a%%.*}";"$b";"$c"\n"; done > reads_list.txt
```

#### Script 4a: Testing

#Illumina 1547
```
cd /nfs1/BPP/LeBoldus_Lab/user_folders/mcmurtrs/bin/Trimmomatic-0.39
java -jar trimmomatic-0.39.jar PE -threads 4 AP9_1P.fastq.gz AP9_2P.fastq.gz AP9_1P_trim.fastq.gz AP9_1P_untrim.fastq.gz AP9_2P_trim.fastq.gz AP9_2P_untrim.fastq.gz SLIDINGWINDOW:4:20 MINLEN:25
```

#Illumina 1549
```
cd /nfs1/BPP/LeBoldus_Lab/user_folders/mcmurtrs/bin/Trimmomatic-0.39
java -jar trimmomatic-0.39.jar PE -threads 4 A1_1P.fastq.gz A1_2P.fastq.gz A1_1P_trim.fastq.gz A1_2P_untrim.fastq.gz A1_1P_trim.fastq.gz A1_2P_untrim.fastq.gz SLIDINGWINDOW:4:20 MINLEN:25
```



#### Script 4b: Trimmomatic
##### qsub /nfs1/BPP/LeBoldus_Lab/user_folders/mcmurtrs/bin/Trimmomatic-0.3/TrimmomaticTrim.sh

``` 
#!/bin/bash
#$ -N JustKeepTrimming
#$ -V
#$ -pe thread 8
#$ -cwd
#$ -S /bin/bash
#$ -l mem_free=128G
#$ -t 1-4:1
i=$(expr $SGE_TASK_ID - 1)
FILE=( `cat /nfs1/BPP/LeBoldus_Lab/user_folders/mcmurtrs/bin/Trimmomatic-0.39/reads_list.txt`)
IFS=';' read -r -a arr <<< "${FILE[$i]}"

R1_RAW=${arr[1]}
R2_RAW=${arr[2]}
R1_UNTRIM=${arr[0]}_1P_untrim.fastq.gz
R2_UNTRIM=${arr[0]}_2P_untrim.fastq.gz
R1_TRIM=${arr[0]}_1P_trim.fastq.gz
R2_TRIM=${arr[0]}_2P_trim.fastq.gz
CPU=8



#Trim Adapters
java -jar trimmomatic-0.39.jar PE -phred33 -threads 4 $R1_RAW $R2_RAW $R1_TRIM $R1_UNTRIM $R2_TRIM $R2_UNTRIM SLIDINGWINDOW:4:20 MINLEN:25
```


# Trimmomatic backup script:

``` 
#!/bin/bash
#$ -N JustKeepTrimming
#$ -V
#$ -pe thread 8
#$ -cwd
#$ -S /bin/bash
#$ -l mem_free=128G
#$ -t 1-28:1
i=$(expr $SGE_TASK_ID - 1)
FILE=( `cat /nfs1/BPP/LeBoldus_Lab/user_folders/mcmurtrs/bin/Trimmomatic-0.39/reads_list_new.txt`)
IFS=';' read -r -a arr <<< "${FILE[$i]}"

ASSPATH=${arr[0]}_Ass
R1_RAW=${arr[1]}
R2_RAW=${arr[2]}
R1_UNTRIM=${arr[0]}_1P_untrim.fastq.gz
R2_UNTRIM=${arr[0]}_2P_untrim.fastq.gz
R1_TRIM=${arr[0]}_1P_trim.fastq.gz
R2_TRIM=${arr[0]}_2P_trim.fastq.gz
R1_FILTER=$ASSPATH/${arr[0]}_filtered_1.fastq.gz
R2_FILTER=$ASSPATH/${arr[0]}_filtered_2.fastq.gz
CPU=8

#mkdir ${arr[0]}_Ass

#Trim Adapters
java -jar trimmomatic-0.39.jar PE -phred33 -threads 4 $R1_RAW $R2_RAW $R1_TRIM $R1_UNTRIM $R2_TRIM $R2_UNTRIM SLIDINGWINDOW:4:20 MINLEN:25

```


### Script 5 : FastQC on Trimmed/Filtered Reads
``` 
cd /nfs1/BPP/LeBoldus_Lab/user_folders/mcmurtrs/cs_align/2_Step_2_Trim_with_Trimmomatic/Illumina_1547
SGE_Batch -c 'fast_qc.sh' -P 8 -f 8G -m 8G -r fastQC_log

```


To do:
Add fastQC files to new github .io page
Start on map of all isolates when vcf file is achived.

#### FastQC files for original raw reads:

- Illumina 1532: http://hts.cgrb.oregonstate.edu/illumina/210430_J00107_0276_AHKNCYBBXY_1532-L2/
- Illumina 1547: http://hts.cgrb.oregonstate.edu/illumina/210902_J00107_0291_AHLL2WBBXY_1547-L2456/
- Illumina 1549: http://hts.cgrb.oregonstate.edu/illumina/210927_J00107_0293_AHLLT7BBXY_1549-L1/

#### FastQC files for all trimmed/filtered reads:

https://github.com/mcmurtrs/lrr.fastqc.github.io/blob/main/README.md

### Script 6 : Alignment with BWA

``` 
for i in /nfs1/BPP/LeBoldus_Lab/user_folders/mcmurtrs/cs_align/2_Step_2_Trim_with_Trimmomatic/Illumina_1549/*.fastq.gz*; do a=$(basename $i| cut -f 2,5 -d "/"| cut -f 1 -d "_"); b=$(readlink -f $i); c=$(readlink -f $i| sed 's/1P/2P/g'); printf ${a%%.*}";"$b";"$c"\n"; done > reads_list.txt
``` 

``` 
cd /nfs1/BPP/LeBoldus_Lab/user_folders/mcmurtrs/cs_align/3_Step_3_BWA_aligner/Illumina_1547
qsub BWA_aligner4.sh

#!/bin/bash
#$ -N BWA_align
#$ -e bam3_error
#$ -o bam3_output
#$ -V
#$ -pe thread 8
#$ -cwd
#$ -S /bin/bash
#$ -l mem_free=128G
#$ -t 1-25:1



IFS="
"
REF="/nfs1/BPP/LeBoldus_Lab/user_folders/mcmurtrs/cs_align/Index/Index/GCA_002794785.1_PSUO.v3_genomic.fna"
MYFILE='/nfs1/BPP/LeBoldus_Lab/user_folders/mcmurtrs/cs_align/3_Step_3_BWA_aligner/Illumina_1547/reads_list1.txt'
CPU=8




    for LINE in `cat ${MYFILE}`; do
    ELEMENT1=`echo ${LINE} | awk 'BEGIN{FS=";"}{print $1}'`
    #echo "ELEMENT1 is: ${ELEMENT1}"

    ELEMENT2=`echo ${LINE} | awk 'BEGIN{FS=";"}{print $2}'`
    #echo "ELEMENT2 is: ${ELEMENT2}"

    ELEMENT3=`echo ${LINE} | awk 'BEGIN{FS=";"}{print $3}'`
    #echo "ELEMENT3 is: ${ELEMENT3}"

    ########### Step 1: BWA mapping ###############
    # The GATK needs read group info:
    # https://software.broadinstitute.org/gatk/guide/article?id=6472
    # SM: sample
    # LB: library, may be sequenced multiple times
    # ID: Read Group Identifier, a unique identifier
    # PL: Platform/technology used

    RG="@RG\tID:${ELEMENT1}\tLB:${ELEMENT1}\tPL:illumina\tSM:${ELEMENT1}\tPU:${ELEMENT1}"
    echo "Mapping reads using BWA"
    echo "#####"
    #CMD="/raid1/home/bpp/tabimaj/bin/bwa/bwa mem -M -R \"$RG\" $REF ${ELEMENT2} ${ELEMENT3} > sams/${ELEMENT1}.sam"
    CMD="/raid1/home/bpp/tabimaj/bin/bwa/bwa mem -M -R \"$RG\" $REF -p ${ELEMENT2} ${ELEMENT3}  > sams/${ELEMENT1}.sam"
    echo $CMD
    eval $CMD
    echo -n "BWA finished at "
    date

    #------NO ERRORS 9.26.2021-----------

    ######Step 2: Samtools Post Processing#########
    #echo "SAMtools: Fixing mates"
    #echo "#####"
    #CMD="/nfs1/BPP/LeBoldus_Lab/user_folders/mcmurtrs/local/bin/samtools-1.9/samtools view -bSu sams3/${ELEMENT1}.sam | samtools sort -n -O bam -o bams3/${ELEMENT1}_nsort -T       bams3/${ELEMENT1}_nsort_tmp"
    #echo $CMD
    #eval $CMD
    #echo -n "SAMtools step 2.1 finished at "
    #date


    #echo $CMD
    #eval $CMD
    #echo -n "SAMtools step 2.1 finished at "
    #date

    #CMD="/nfs1/BPP/LeBoldus_Lab/user_folders/mcmurtrs/local/bin/samtools-1.9/samtools fixmate -O bam bams3/${ELEMENT1}_nsort /dev/stdout | samtools sort -O bam -o                   bams3/${ELEMENT1}_csort.bam"
    #echo $CMD
    #eval $CMD
    #echo -n "SAMtools step 2.2 finished at "
    #date

    #CMD="/nfs1/BPP/LeBoldus_Lab/user_folders/mcmurtrs/local/bin/samtools-1.9/samtools calmd -b bams3/${ELEMENT1}_csort.bam $REF > bams3/${ELEMENT1}_fixed.bam"
    #echo $CMD
    #eval $CMD
    #echo -n "SAMtools step 2 finished at "
    #date
    
    ########## Step 3. Assign read groups #########
    echo "PICARD: assign read groups"
    echo "#####"

    #Assigning Read Groups
    CMD="/raid1/home/bpp/tabimaj/bin/jre1.8.0_144/bin/java -Xmx4g -Djava.io.tmpdir=/data -jar /raid1/home/bpp/tabimaj/bin/picard.jar AddOrReplaceReadGroups I=bams3/${ELEMENT1}_fixed.bam O=bams3/${ELEMENT1}_read_groups.bam RGID=${ELEMENT1} RGLB=lib1 RGPL=illumina RGPU=unit1 RGSM=${ELEMENT1}"
    echo $CMD
    eval $CMD
    
    #Marking duplicates
    #CMD="/raid1/home/bpp/tabimaj/bin/jre1.8.0_144/bin/java -Xmx4g -Djava.io.tmpdir=/data -jar /raid1/home/bpp/tabimaj/bin/picard.jar MarkDuplicates I=bams3/${ELEMENT1}_read_groups.bam O=bams3/${ELEMENT1}_renamedRG_dupmrk.bam MAX_FILE_HANDLES_FOR_READ_ENDS_MAP=1000 ASSUME_SORT_ORDER=coordinate M=bams3//${ELEMENT1}_marked_dup_metrics.txt"
    #echo $CMD
    #eval $CMD


    ####Step 4: Index the bam file######
    #--------NO ERRORS 11:47PM------------
    #CMD="samtools index bams3/${ELEMENT1}_renamedRG_dupmrk.bam"
    #echo $CMD
    #eval $CMD
    #echo -n "PICARD: Marking duplicates finished at "
    #date
    
    #echo "Indel Realigner"
    #CMD="/raid1/home/bpp/tabimaj/bin/jre1.8.0_144/bin/java -Xmx4g -Djava.io.tmpdir=/data -jar /raid1/home/bpp/tabimaj/bin/GenomeAnalysisTK.jar -T RealignerTargetCreator -R $REF -I bams3/${ELEMENT1}_renamedRG_dupmrk.bam -o bams3/${ELEMENT1}.intervals"
    #echo $CMD
    #eval $CMD
    
    #CMD="/raid1/home/bpp/tabimaj/bin/jre1.8.0_144/bin/java -Xmx4g -Djava.io.tmpdir=/data -jar /raid1/home/bpp/tabimaj/bin/GenomeAnalysisTK.jar -T IndelReal-R $REF -I  bams2/${ELEMENT1}_renamedRG_dupmrk.bam -targetIntervals bams2/${ELEMENT1}.intervals -o bams2/${ELEMENT1}.reindel.bam --consensusDeterminationModel USE_READS -LOD 0.4"
    #echo $CMD
    #eval $CMD


    #echo -n "Indel Realigner finished at "
    #date






    echo "FINISH-----GR8-----JOB----M8!"
    done



``` 

### Script 7 : Alignment stats on .sam files

``` 
cd /nfs1/BPP/LeBoldus_Lab/user_folders/mcmurtrs/cs_align/3_Step_3_BWA_aligner/Illumina_1547
bash
for i in /nfs1/BPP/LeBoldus_Lab/user_folders/mcmurtrs/cs_align/3_Step_3_BWA_aligner/Illumina_1547/sams3/*; do a=$(basename $i); b=$(readlink -f $i); printf ${a%%.*}";"$b"\n"; done > sams.list
```

#### /nfs1/BPP/LeBoldus_Lab/user_folders/mcmurtrs/cs_align/3_Step_3_BWA_aligner/Illumina_1547/sams2/stats_sam1.sh

``` 
#!/bin/bash
#$ -cwd
#$ -S /bin/bash
#$ -N BWA_aligner
#$ -e bam_error
#$ -o bam_output
#$ -V
#$ -t 1-60:1

IFS="
"
MYFILE='/nfs1/BPP/LeBoldus_Lab/user_folders/mcmurtrs/cs_align/3_Step_3_BWA_aligner/Illumina_1547/sams2/sams.list'
CPU=12
#mkdir -p sams
#mkdir -p bams
#mkdir bam_error
#mkdir bam_output



    for LINE in `cat ${MYFILE}`; do
    ELEMENT1=`echo ${LINE} | awk 'BEGIN{FS=";"}{print $1}'`
    #echo "ELEMENT1 is: ${ELEMENT1}"

    ELEMENT2=`echo ${LINE} | awk 'BEGIN{FS=";"}{print $2}'`
    #echo "ELEMENT2 is: ${ELEMENT2}"

    ELEMENT3=`echo ${LINE} | awk 'BEGIN{FS=";"}{print $3}'`
    #echo "ELEMENT3 is: ${ELEMENT3}"

    CMD="samtools flagstat $ELEMENT2 > align_stats/$ELEMENT1"
    echo $CMD
    eval $CMD



    echo -n "Samtools flagstat done at:"
    date
done
``` 

#### Mapping percentage results

``` 
bash
for i in *; do a=$( grep "properly" $i); printf '%s ' $i"\t"$a"\n"; done | perl -pe 's/\\n/\n/g' | perl -pe 's/\\t/\t/g' > mapping_percentage.txt
``` 


### Script #8: Creating a genotype file per sample
#### All individual vcf files are stored at:
```/nfs1/BPP/LeBoldus_Lab/user_folders/mcmurtrs/cs_align/5_Step_5_Genotyping_Reads/gvcf5```

```

### cd /nfs1/BPP/LeBoldus_Lab/user_folders/mcmurtrs/cs_align/5_Step_5_Genotyping_Reads/gvcf4
### ./gVCF.sh

### /nfs1/BPP/LeBoldus_Lab/user_folders/mcmurtrs/cs_align/5_Step_5_Genotyping_Reads/gvcf4

for i in /home/bpp/mcmurtrs/my_dir/cs_align/Bams/*_dupmrk.bam; do a=$(basename $i| sed 's/_dupmrk.bam//g'); b=$(readlink -f $i); printf $a";"$b"\n"; done > bams.list

for i in /nfs1/BPP/LeBoldus_Lab/user_folders/mcmurtrs/cs_align/3_Step_3_BWA_aligner/Illumina_1547/bams3/*_dupmrk.bam; do a=$(basename $i| sed 's/_dupmrk.bam//g'); b=$(readlink -f $i); printf $a";"$b"\n"; done > bams.list

cd /nfs1/BPP/LeBoldus_Lab/user_folders/mcmurtrs/cs_align/5_Step_5_Genotyping_Reads/gvcf4

qsub gVCF.sh


```


/nfs1/BPP/LeBoldus_Lab/user_folders/mcmurtrs/cs_align/5_Step_5_Genotyping_Reads/gVCF1.sh

```

#!/bin/bash
#$ -N mkgvcf_uf
#$ -e gvcf_error
#$ -o gvcf_output
#$ -V
#$ -cwd
#$ -S /bin/bash
#$ -l mem_free=10G
#$ -t 1-60:1
i=$(expr $SGE_TASK_ID - 1)
FILE=( `cat "/nfs1/BPP/LeBoldus_Lab/user_folders/mcmurtrs/cs_align/Bams/bams.list.copy" `)
IFS=';' read -r -a arr <<< "${FILE[$i]}"
mkdir -p gvcf1/
REF="/nfs1/BPP/LeBoldus_Lab/user_folders/mcmurtrs/cs_align/Index/GCA_002794785.1_PSUO.v3_genomic.fna"

CMD='/nfs1/BPP/LeBoldus_Lab/user_folders/mcmurtrs/bin/gatk-4.2.0.0/gatk --java-options "-Xmx10g -Djava.io.tmpdir=/data" HaplotypeCaller
--reference $REF --ERC GVCF -ploidy 2 --input ${arr[1]} -O ${arr[0]}.g.vcf.gz'

echo $CMD
eval $CMD
echo date
echo
"mkgvcf finished." myEpoch=(`date +%s`) echo "Epoch start:" $myEpoch
# EOF.



```


### Script 9: Combinging all filtered gVCF files into one large g.VCF file:
' for i in /nfs1/BPP/LeBoldus_Lab/user_folders/mcmurtrs/cs_align/gvcf/*; do a=$(basename $i| sed 's/_vcf.gz//g'); b=$(readlink -f $i); printf $b" -V ""\n"; done > vcf2.list'

` for i in /nfs1/BPP/LeBoldus_Lab/user_folders/mcmurtrs/cs_align/gvcf/*; do a=$(basename $i| sed 's/_vcf.gz//g'); b=$(readlink -f $i); printf $a";"$b"\n"; done > vcf.list `

` nano /nfs1/BPP/LeBoldus_Lab/user_folders/mcmurtrs/cs_align/gvcf/combine_vcf.sh `
- Cutting the following samples due to abnormally small file size post individual filtering step:
- -rw-r--r-- 1 mcmurtrs bpp   20 Nov  2 15:36 MP6.vcf.gz
- -rw-r--r-- 1 mcmurtrs bpp   20 Nov  2 15:36 B2.vcf.gz
- -rw-r--r-- 1 mcmurtrs bpp   20 Nov  2 15:36 C1.vcf.gz
- -rw-r--r-- 1 mcmurtrs bpp   20 Nov  2 15:36 C2.vcf.gz
- Brings file count down to 102/118 (86% for C. sulphurascens only samples)

```

#! /bin/bash
#$ -N weirri_combineVCF
#$ -V
#$ -cwd
#$ -S /bin/bash
#$ -e vcf_error
#$ -o vcf_output
i=$(expr $SGE_TASK_ID - 1)

REF="/nfs1/BPP/LeBoldus_Lab/user_folders/mcmurtrs/cs_align/Index/GCA_002794785.1_PSUO.v3_genomic.fna"
CMD="/nfs1/BPP/LeBoldus_Lab/user_folders/mcmurtrs/bin/gatk-4.2.0.0/gatk CombineGVCFs -R $REF -V /home/bpp/mcmurtrs/my_dir/cs_align/5_Step_5_Genotyping_Reads/gvcf1/vcf.list -O weirri_only_11_5_21.g.vcf.gz"

echo $CMD
eval $CMD


```


### Script #11: Genotyping combined vcf file:
```

cd /nfs1/BPP/LeBoldus_Lab/user_folders/mcmurtrs/cs_align/5_Step_5_Genotyping_Reads/gvcf/genotype_vcf.sh

```

```

#! /bin/bash
#$ -V
#$ -v TMPDIR=/data
#$ -N Geno_chrom
#$ -l mem_free=40G
#$ -S /bin/bash
#$ -cwd
#$ -e genoType_error
#$ -o genoType_output

mkdir -p genotyped
REF="/nfs1/BPP/LeBoldus_Lab/user_folders/mcmurtrs/cs_align/Index/GCA_002794785.1_PSUO.v3_genomic.fna"

i=$(expr $SGE_TASK_ID)


CMD="/raid1/home/bpp/tabimaj/bin/gatk-4.0.1.2/gatk --java-options '-Xmx40g -Djava.io.tmpdir=/data -XX:ParallelGCThreads=1 -DSTACK_TRACE_ON_USEREXCEPTION -XX:ErrorFile=file.log' GenotypeGVCFs -R $REF -V /nfs1/BPP/LeBoldus_Lab/user_folders/mcmurtrs/cs_align/5_Step_5_Genotyping_Reads/gvcf1/Cs_only_copy_genotyped.vcf.gz"


echo $CMD
eval $CMD

#EOF.



```

### Script #10: Selecting only SNPs and filtering out the indels
- For our analysis we are only interested in the SNP data.
- We can eliminate al the Indels making our file smaller and helping to minimize the number of false positive variants.
- The indels might get filtered out through the following filtering steps but just to be overly paranoid let's go ahead an filter out all the indels out of our SNP vcf file.
- 

```
cd /nfs1/BPP/LeBoldus_Lab/user_folders/mcmurtrs/cs_align/5_Step_5_Genotyping_Reads/gvcf5/
./Select_SNPs.sh

```

```
#! /bin/bash
#$ -N Select_variants
#$ -V
#$ -cwd
#$ -S /bin/bash
#$ -e error_validate_variants
#$ -o output_validat_variants
i=$(expr $SGE_TASK_ID - 1)

REF="/nfs1/BPP/LeBoldus_Lab/user_folders/mcmurtrs/cs_align/Index/GCA_002794785.1_PSUO.v3_genomic.fna"
INPUT="/nfs1/BPP/LeBoldus_Lab/user_folders/mcmurtrs/cs_align/5_Step_5_Genotyping_Reads/gvcf5/30_final_BS_dec28.g.vcf.gz"
OUTPUT="/nfs1/BPP/LeBoldus_Lab/user_folders/mcmurtrs/cs_align/5_Step_5_Genotyping_Reads/gvcf5/30_final_BS_SNPs_dec28.g.vcf.gz"



CMD="/nfs1/BPP/LeBoldus_Lab/user_folders/mcmurtrs/bin/gatk-4.2.0.0/gatk SelectVariants -R $REF -V $INPUT --select-type-to-include SNP -O $OUTPUT"



echo $CMD
eval $CMD
date
#EOF

```





### Script #12: Filtering the combined vcf file with vcftools on the cluster:

- We are doing this as a preliminary filtering step before we move the vcf file to our personal computer and filter more within R.


```
vcftools --gzvcf 29_final_GENO_SNPs_dec28.g.vcf.gz --maf 0.1 --max-missing 0.9 --minQ 30 --min-meanDP 10 --max-meanDP 50 --recode --stdout | gzip -c > 29_final_FiltVCFtools.vcf.gz



vcftools --gzvcf Cs_ALL_FINAL_GENOTYPED_11_30_21.g.vcf.gz --max-missing 0.8 --minQ 50 --recode --recode-INFO-all --out Cs_ALL_FINAL_GENOTYPED_filtered_11_31_21.g.vcf.gz

```

### Quality Check on vcf file with vcfR:

```
***** Object of Class vcfR *****
102 samples
2 CHROMs
883,157 variants
Object size: 2196.4 Mb
0 percent missing data
*****        *****         *****
```
    












### Script 14 : Denovo Assembly with Spades
``` 
cd /nfs1/BPP/LeBoldus_Lab/user_folders/mcmurtrs/cs_align/

``` 
``` echo 1	 &&  /nfs1/BPP/LeBoldus_Lab/user_folders/mcmurtrs/bin/bbmap/sendsketch.sh /nfs1/BPP/LeBoldus_Lab/user_folders/mcmurtrs/cs_align/2_Step_2_Trim_with_Trimmomatic/Illumina_1547/Spades/A-2/contigs.fasta``
