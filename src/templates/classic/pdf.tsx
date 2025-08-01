/**
 * Classic template PDF component.
 * Renders the resume as a PDF using @react-pdf/renderer.
 * Provides ATS-compatible formatting with clean, professional layout.
 */

"use client";

import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Link,
} from "@react-pdf/renderer";
import type { Resume } from "@/lib/types";

const styles = StyleSheet.create({
  page: {
    padding: 36,
    fontFamily: "Times-Roman",
    fontSize: 11,
    lineHeight: 1.2,
  },
  header: {
    textAlign: "center",
    marginBottom: 8,
  },
  name: {
    fontSize: 20,
    fontFamily: "Times-Bold",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  contactRow: {
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
    fontSize: 10,
    marginTop: 4,
  },
  contactItem: {
    marginHorizontal: 4,
  },
  separator: {
    marginHorizontal: 4,
  },
  link: {
    color: "#000000",
    textDecoration: "underline",
  },
  section: {
    marginTop: 12,
  },
  sectionTitle: {
    fontSize: 12,
    fontFamily: "Times-Bold",
    textTransform: "uppercase",
    borderBottomWidth: 1,
    borderBottomColor: "#000000",
    paddingBottom: 2,
    marginBottom: 6,
  },
  entry: {
    marginBottom: 8,
  },
  entryHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  entryTitle: {
    fontFamily: "Times-Bold",
  },
  entrySubheader: {
    flexDirection: "row",
    justifyContent: "space-between",
    fontFamily: "Times-Italic",
    fontSize: 10,
  },
  projectHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  projectTitle: {
    fontFamily: "Times-Bold",
  },
  projectTech: {
    fontFamily: "Times-Italic",
  },
  bulletList: {
    marginLeft: 12,
    marginTop: 4,
  },
  bulletItem: {
    flexDirection: "row",
    fontSize: 10,
    marginBottom: 2,
  },
  bulletPoint: {
    width: 10,
  },
  bulletText: {
    flex: 1,
  },
  skillsRow: {
    flexDirection: "row",
    fontSize: 10,
    marginBottom: 2,
  },
  skillLabel: {
    fontFamily: "Times-Bold",
  },
});

interface PDFProps {
  data: Resume;
}

export function ClassicPDF({ data }: PDFProps) {
  const { personalInfo, education, experience, projects, skills } = data;

  const hasPersonalInfo = personalInfo.fullName || personalInfo.email || personalInfo.phone;
  const hasEducation = education.length > 0;
  const hasExperience = experience.length > 0;
  const hasProjects = projects.length > 0;
  const hasSkills = skills.languages || skills.frameworks || skills.tools || skills.libraries;

  const formatUrl = (url: string | undefined) => {
    if (!url) return "";
    return url.replace(/^https?:\/\//, "").replace(/\/$/, "");
  };

  return (
    <Document>
      <Page size="LETTER" style={styles.page}>
        {hasPersonalInfo && (
          <View style={styles.header}>
            <Text style={styles.name}>
              {personalInfo.fullName || "Your Name"}
            </Text>
            <View style={styles.contactRow}>
              {personalInfo.phone && (
                <Text style={styles.contactItem}>{personalInfo.phone}</Text>
              )}
              {personalInfo.phone && personalInfo.email && (
                <Text style={styles.separator}>|</Text>
              )}
              {personalInfo.email && (
                <Link src={`mailto:${personalInfo.email}`} style={styles.link}>
                  <Text style={styles.contactItem}>{personalInfo.email}</Text>
                </Link>
              )}
              {personalInfo.linkedin && (
                <>
                  <Text style={styles.separator}>|</Text>
                  <Link src={personalInfo.linkedin} style={styles.link}>
                    <Text style={styles.contactItem}>
                      {formatUrl(personalInfo.linkedin)}
                    </Text>
                  </Link>
                </>
              )}
              {personalInfo.github && (
                <>
                  <Text style={styles.separator}>|</Text>
                  <Link src={personalInfo.github} style={styles.link}>
                    <Text style={styles.contactItem}>
                      {formatUrl(personalInfo.github)}
                    </Text>
                  </Link>
                </>
              )}
            </View>
          </View>
        )}

        {hasEducation && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Education</Text>
            {education.map((edu) => (
              <View key={edu.id} style={styles.entry}>
                <View style={styles.entryHeader}>
                  <Text style={styles.entryTitle}>{edu.school}</Text>
                  <Text>{edu.location}</Text>
                </View>
                <View style={styles.entrySubheader}>
                  <Text>
                    {edu.degree}
                    {edu.field && ` in ${edu.field}`}
                    {edu.gpa && `, GPA: ${edu.gpa}`}
                  </Text>
                  <Text>
                    {edu.startDate}
                    {edu.endDate && ` -- ${edu.endDate}`}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        )}

        {hasExperience && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Experience</Text>
            {experience.map((exp) => (
              <View key={exp.id} style={styles.entry}>
                <View style={styles.entryHeader}>
                  <Text style={styles.entryTitle}>{exp.title}</Text>
                  <Text>
                    {exp.startDate}
                    {exp.current ? " -- Present" : exp.endDate ? ` -- ${exp.endDate}` : ""}
                  </Text>
                </View>
                <View style={styles.entrySubheader}>
                  <Text>{exp.company}</Text>
                  <Text>{exp.location}</Text>
                </View>
                {exp.bullets.length > 0 && (
                  <View style={styles.bulletList}>
                    {exp.bullets
                      .filter((b) => b.trim())
                      .map((bullet, idx) => (
                        <View key={idx} style={styles.bulletItem}>
                          <Text style={styles.bulletPoint}>•</Text>
                          <Text style={styles.bulletText}>{bullet}</Text>
                        </View>
                      ))}
                  </View>
                )}
              </View>
            ))}
          </View>
        )}

        {hasProjects && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Projects</Text>
            {projects.map((proj) => (
              <View key={proj.id} style={styles.entry}>
                <View style={styles.projectHeader}>
                  <Text>
                    <Text style={styles.projectTitle}>{proj.name}</Text>
                    {proj.technologies && (
                      <Text style={styles.projectTech}> | {proj.technologies}</Text>
                    )}
                  </Text>
                  <Text>
                    {proj.startDate}
                    {proj.endDate && ` -- ${proj.endDate}`}
                  </Text>
                </View>
                {proj.bullets.length > 0 && (
                  <View style={styles.bulletList}>
                    {proj.bullets
                      .filter((b) => b.trim())
                      .map((bullet, idx) => (
                        <View key={idx} style={styles.bulletItem}>
                          <Text style={styles.bulletPoint}>•</Text>
                          <Text style={styles.bulletText}>{bullet}</Text>
                        </View>
                      ))}
                  </View>
                )}
              </View>
            ))}
          </View>
        )}

        {hasSkills && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Technical Skills</Text>
            {skills.languages && (
              <View style={styles.skillsRow}>
                <Text style={styles.skillLabel}>Languages: </Text>
                <Text>{skills.languages}</Text>
              </View>
            )}
            {skills.frameworks && (
              <View style={styles.skillsRow}>
                <Text style={styles.skillLabel}>Frameworks: </Text>
                <Text>{skills.frameworks}</Text>
              </View>
            )}
            {skills.tools && (
              <View style={styles.skillsRow}>
                <Text style={styles.skillLabel}>Developer Tools: </Text>
                <Text>{skills.tools}</Text>
              </View>
            )}
            {skills.libraries && (
              <View style={styles.skillsRow}>
                <Text style={styles.skillLabel}>Libraries: </Text>
                <Text>{skills.libraries}</Text>
              </View>
            )}
          </View>
        )}
      </Page>
    </Document>
  );
}
